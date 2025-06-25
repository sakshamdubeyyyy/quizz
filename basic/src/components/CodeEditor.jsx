import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FullscreenProctor from '../utils/useProtoctor';

const CodeEditor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const quiz = location.state?.quiz;
    const userId = localStorage.getItem("userId") || "";
    // console.log(quiz)

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [code, setCode] = useState('');
    const [consoleOutput, setConsoleOutput] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [submissions, setSubmissions] = useState([]);

    const currentQuestion = quiz?.questions[currentQuestionIndex];

    useEffect(() => {
        if (currentQuestion) {
            setCode(currentQuestion.starterCode?.replace(/\\n/g, '\n') || '// Start coding...');
            setLanguage(currentQuestion.language || 'javascript');
        }
    }, [currentQuestionIndex, quiz]);

    const runCode = async () => {
        if (!currentQuestion || !quiz?._id) return;
    
        setConsoleOutput('// Running...');
    
        const payload = {
            userId,
            quizId: quiz._id,
            questionId: currentQuestion._id,
            code,
            language,
        };
    
        console.log("🔍 Submitting code with payload:", payload);
    
        try {
            const response = await axios.post('http://localhost:5000/api/code/submitCode', payload);
    
            console.log("✅ Server Response:", response.data);
    
            const { results, isCorrect } = response.data;
    
            let outputLog = results
                .map((r, i) =>
                    r.passed
                        ? `✅ Test Case ${i + 1} Passed`
                        : `❌ Test Case ${i + 1} Failed\nExpected: ${currentQuestion.testCases[i].expectedOutput}\nReceived: ${r.output || 'None'}\nError: ${r.error || 'None'}`
                )
                .join('\n\n');
    
            setConsoleOutput(outputLog);
    
            setSubmissions((prev) => [
                ...prev,
                {
                    questionId: currentQuestion._id,
                    isCorrect,
                    results,
                },
            ]);
        } catch (err) {
            console.error("❌ Error while submitting code:", err.response?.data || err.message);
            setConsoleOutput(err.response?.data?.message || err.message || 'Error running code');
        }
    };
    
    const handleNext = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setConsoleOutput('');
        } else {
            toast.success('Quiz submitted successfully!', { position: 'top-center', autoClose: 3000 });
            navigate('/student-dashboard', {
                state: {
                    quizTitle: quiz.title,
                    submissions,
                },
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#0f111a] text-white flex flex-col items-center py-10 px-4">
            <FullscreenProctor onExit={handleNext}/>
            <motion.h1 className="text-2xl font-bold mb-4">{quiz?.title || 'Code Editor'}</motion.h1>

            {currentQuestion && (
                <>
                    <div className="w-full max-w-5xl mb-4">
                        <h2 className="text-xl font-semibold mb-2">
                            Q{currentQuestionIndex + 1}. {currentQuestion.title}
                        </h2>
                        <p className="text-gray-300 mb-2">{currentQuestion.description}</p>
                        <p className="text-sm text-yellow-400">Points: {currentQuestion.points}</p>
                    </div>

                    <div className="w-full max-w-5xl mb-4">
                        <label className="text-lg font-medium">
                            Language:
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="ml-2 px-2 py-1 bg-[#1e1e1e] border border-gray-600 rounded"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                            </select>
                        </label>
                    </div>

                    <motion.div
                        className="w-full max-w-5xl rounded-lg overflow-hidden shadow-2xl border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <MonacoEditor
                            width="100%"
                            height="300"
                            language={language}
                            theme="vs-dark"
                            value={code}
                            onChange={(newValue) => setCode(newValue)}
                            options={{
                                selectOnLineNumbers: true,
                                automaticLayout: true,
                                fontSize: 16,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                wordWrap: 'on',
                                formatOnType: true,
                                formatOnPaste: true,
                            }}
                        />
                    </motion.div>

                    <div className="flex gap-4 mt-6">
                        <motion.button
                            onClick={runCode}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-blue-600 hover:bg-blue-700 transition-colors px-6 py-2 rounded-md text-white font-semibold shadow-md"
                        >
                            Run Code
                        </motion.button>

                        <motion.button
                            onClick={handleNext}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-600 hover:bg-green-700 transition-colors px-6 py-2 rounded-md text-white font-semibold shadow-md"
                        >
                            {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                        </motion.button>
                    </div>

                    <motion.div
                        className="w-full max-w-5xl mt-6 bg-[#1e1e1e] border border-gray-700 rounded-lg p-4 text-sm font-mono whitespace-pre-wrap min-h-[120px]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                    >
                        {consoleOutput || '// Output will appear here'}
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default CodeEditor;
