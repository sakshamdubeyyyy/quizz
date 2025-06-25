import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddQuizForm = () => {
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        duration: 60,
        passingScore: 70,
        questions: [
            {
                title: '',
                description: '',
                difficulty: 'medium',
                language: 'javascript',
                category: '',
                starterCode: '',
                points: 10,
                testCases: [],
                testCaseDraft: { input: '', expectedOutput: '', isHidden: false }
            }
        ]
    });
    const emptyQuestion = {
        title: '',
        description: '',
        difficulty: 'medium',
        language: 'javascript',
        category: '',
        starterCode: '',
        points: 10,
        testCases: [],
        testCaseDraft: { input: '', expectedOutput: '', isHidden: false }
    };

    const handleQuizFieldChange = (field, value) => {
        setQuizData(prev => ({ ...prev, [field]: value }));
    };

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[index][field] = value;
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
    };

    const handleTestCaseDraftChange = (qIndex, field, value) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[qIndex].testCaseDraft[field] = value;
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
    };

    const addTestCase = (qIndex) => {
        const updatedQuestions = [...quizData.questions];
        const { input, expectedOutput, isHidden } = updatedQuestions[qIndex].testCaseDraft;

        if (!input || !expectedOutput) return;

        updatedQuestions[qIndex].testCases.push({ input, expectedOutput, isHidden });
        updatedQuestions[qIndex].testCaseDraft = { input: '', expectedOutput: '', isHidden: false };
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
    };

    const removeTestCase = (qIndex, tcIndex) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[qIndex].testCases.splice(tcIndex, 1);
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
    };

    const addNewQuestion = () => {
        const newQuestion = {
            title: '',
            description: '',
            difficulty: 'medium',
            language: 'javascript',
            category: '',
            starterCode: '',
            points: 10,
            testCases: [],
            testCaseDraft: { input: '', expectedOutput: '', isHidden: false }
        };
        setQuizData(prev => ({ ...prev, questions: [...prev.questions, newQuestion] }));
    };

    const handleQuizSubmit = async (e) => {
        e.preventDefault();
        const questions = quizData.questions.map(q => {
            const { testCaseDraft, ...rest } = q;
            return rest;
        });
        const payload = { ...quizData, questions };
        try {
            await axios.post('http://localhost:5000/api/code', payload);
            toast.success('Quiz created successfully!', { position: 'top-center', autoClose: 3000 });
            setQuizData({
                title: '',
                description: '',
                duration: 60,
                passingScore: 70,
                questions: [emptyQuestion] 
            });
        } catch (err) {
            console.error(err);
            alert('Failed to create quiz');
        }
    };

    const removeQuestion = (index) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions.splice(index, 1);
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
    };

    const inputClass = "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    const labelClass = "block text-sm font-medium text-gray-700";
    const sectionClass = "bg-white p-6 rounded-xl shadow-md space-y-4";

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a New Quiz</h2>
            <form onSubmit={handleQuizSubmit} className="space-y-6">
                <div className={sectionClass}>
                    <div>
                        <label className={labelClass}>Quiz Title</label>
                        <input type="text" className={inputClass} value={quizData.title}
                            onChange={(e) => handleQuizFieldChange('title', e.target.value)} />
                    </div>
                    <div>
                        <label className={labelClass}>Quiz Description</label>
                        <textarea className={inputClass} rows={3} value={quizData.description}
                            onChange={(e) => handleQuizFieldChange('description', e.target.value)} />
                    </div>
                </div>

                {quizData.questions.map((question, qIndex) => (
                    <div key={qIndex} className={sectionClass}>
                        <div className='flex justify-between'>
                            <h3 className="text-xl font-semibold text-gray-700">Question {qIndex + 1}</h3>
                            <div className="text-right">
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(qIndex)}
                                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    disabled={quizData.questions.length === 1}
                                >
                                    Remove Question
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className={labelClass}>Title</label>
                            <input type="text" className={inputClass} value={question.title}
                                onChange={(e) => handleQuestionChange(qIndex, 'title', e.target.value)} />
                        </div>

                        <div>
                            <label className={labelClass}>Description</label>
                            <textarea className={inputClass} rows={3} value={question.description}
                                onChange={(e) => handleQuestionChange(qIndex, 'description', e.target.value)} />
                        </div>

                        <div>
                            <label className={labelClass}>Difficulty</label>
                            <select className={inputClass} value={question.difficulty}
                                onChange={(e) => handleQuestionChange(qIndex, 'difficulty', e.target.value)}>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Language</label>
                            <select className={inputClass} value={question.language}
                                onChange={(e) => handleQuestionChange(qIndex, 'language', e.target.value)}>
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Starter Code</label>
                            <textarea className={inputClass} rows={3} value={question.starterCode}
                                onChange={(e) => handleQuestionChange(qIndex, 'starterCode', e.target.value)} />
                        </div>

                        {/* Test Cases */}
                        <div className="pt-4 border-t">
                            <h4 className="text-md font-semibold text-gray-600 mb-2">Test Cases</h4>
                            <input type="text" placeholder="Input" className={`${inputClass} mb-2`}
                                value={question.testCaseDraft.input}
                                onChange={(e) => handleTestCaseDraftChange(qIndex, 'input', e.target.value)} />
                            <input type="text" placeholder="Expected Output" className={`${inputClass} mb-2`}
                                value={question.testCaseDraft.expectedOutput}
                                onChange={(e) => handleTestCaseDraftChange(qIndex, 'expectedOutput', e.target.value)} />
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" checked={question.testCaseDraft.isHidden}
                                    onChange={(e) => handleTestCaseDraftChange(qIndex, 'isHidden', e.target.checked)} />
                                <span className="text-sm text-gray-700">Hidden Test Case</span>
                            </label>
                            <button type="button" className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                onClick={() => addTestCase(qIndex)}>Add Test Case</button>
                        </div>

                        <div className="mt-4 space-y-2">
                            {question.testCases.map((tc, tcIndex) => (
                                <div key={tcIndex} className="p-3 border rounded bg-gray-100 relative">
                                    <p><strong>Input:</strong> {tc.input}</p>
                                    <p><strong>Expected Output:</strong> {tc.expectedOutput}</p>
                                    <p><strong>Hidden:</strong> {tc.isHidden ? "Yes" : "No"}</p>
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 text-sm text-red-600 hover:underline"
                                        onClick={() => removeTestCase(qIndex, tcIndex)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="text-center">
                    <button type="button" onClick={addNewQuestion}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                        Add Another Question
                    </button>
                </div>

                <div className="text-center">
                    <button type="submit" className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                        Submit Quiz
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuizForm;
