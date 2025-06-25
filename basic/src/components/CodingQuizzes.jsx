import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCodingQuizzes } from '../utils/useGetCodingQuizzes';

const CodingQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { data, error, isLoading } = useGetCodingQuizzes();
    const navigate = useNavigate();

    useEffect(() => {
        if (data) setQuizzes(data.data.slice(0, 5)); // Only show top 5 quizzes
        if (error) console.error(error);
    }, [data, error]);

    const handleTakeQuiz = (quiz) => {
        navigate('/coding-quiz', { state: { quiz } });
    };

    if (isLoading) {
        return <p className="text-center text-slate-500 animate-pulse">Loading top quizzes...</p>;
    }

    if (quizzes.length === 0) {
        return <p className="text-center text-slate-500">No top quizzes available.</p>;
    }

    return (
        <div className='mt-5'>
            <h1 className='font-bold text-2xl'>Available coding quizzes</h1>
            <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {quizzes.map((quiz) => (
                    <div
                        key={quiz._id}
                        className="bg-white p-6 rounded-2xl shadow-md ring-1 ring-slate-200 hover:shadow-lg transition hover:scale-[1.02] duration-300"
                    >
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold text-slate-800">{quiz.title}</h3> 
                            <p className="text-slate-600">
                                <span className="font-medium">Description:</span> {quiz.description} 
                            </p>
                            <p className="text-slate-600">
                                <span className="font-medium">Duration:</span> {quiz.duration} minutes 
                            </p>
                            <p className="text-slate-600">
                                <span className="font-medium">Passing Score:</span> {quiz.passingScore}% 
                            </p>
                            <p className="text-slate-600">
                                <span className="font-medium">Questions:</span> {quiz.questions.length} 
                            </p>
                        </div>
                        <div className="mt-4 text-right">
                            <button
                                onClick={() => handleTakeQuiz(quiz)}
                                className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition font-medium text-sm cursor-pointer"
                            >
                                Take Quiz
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CodingQuizzes;
