import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle } from 'lucide-react';

const ResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const resultData = location.state?.result;

    useEffect(() => {
        window.history.pushState(null, '', window.location.href);
        const handlePopState = () => {
            navigate('/student-dashboard');
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    if (!resultData) {
        return (
            <div className="h-screen flex items-center justify-center text-center p-6">
                <p className="text-xl text-red-600 font-medium">No result data found. Please submit the quiz first.</p>
            </div>
        );
    }

    const { totalScore, allUserAnswers } = resultData;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">🎯 Quiz Result</h1>
                <p className="text-xl font-semibold text-green-600">Total Score: {totalScore}</p>

                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-6">📘 Review Your Answers</h2>
                    {allUserAnswers.map((section, sIndex) => (
                        <div key={sIndex} className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-600 mb-4">Section {sIndex + 1}</h3>
                            <div className="space-y-4">
                                {section.userAnswers.map((answer, qIndex) => (
                                    <div
                                        key={qIndex}
                                        className="p-5 border rounded-xl bg-gray-100 shadow-sm"
                                    >
                                        <p className="mb-2 font-medium text-gray-800">
                                            <span className="text-blue-600">Q{qIndex + 1}:</span> {answer.questionText}
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span className="text-gray-700">Your Answer:</span>
                                            <span
                                                className={`${
                                                    answer.isCorrect ? "text-green-600" : "text-red-500"
                                                } font-semibold flex items-center gap-1`}
                                            >
                                                {answer.isCorrect ? (
                                                    <CheckCircle size={18} />
                                                ) : (
                                                    <XCircle size={18} />
                                                )}
                                                {answer.selectedAnswer || "Not answered"}
                                            </span>
                                        </p>
                                        <p className="text-blue-700 mt-1">
                                            Correct Answer: <strong>{answer.correctAnswer}</strong>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold px-6 py-3 rounded-xl shadow"
                        onClick={() => navigate('/student-dashboard')}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultPage;
