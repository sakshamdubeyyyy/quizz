import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetQuizzes } from '../utils/useGetQuizzes';

const TopQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const { data, error, isLoading } = useGetQuizzes();
    // console.log("TopQuizzes data:", data); 
    const navigate = useNavigate();

    useEffect(() => {
        if (data) setQuizzes(data.data.slice(0, 5));
        if (error) console.error(error);
    }, [data, error]);

    const handleTakeQuiz = (quiz) => {
        navigate('/quiz', { state: { quiz } });
    };

    if (isLoading) {
        return <p className="text-center text-slate-500 animate-pulse">Loading top quizzes...</p>;
    }

    if (quizzes.length === 0) {
        return <p className="text-center text-slate-500">No top quizzes available.</p>;
    }

    return (
        <div className="mt-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {quizzes.map((quiz) => (
                <div
                    key={quiz._id}
                    className="bg-white p-6 rounded-2xl shadow-md ring-1 ring-slate-200 hover:shadow-lg transition hover:scale-[1.02] duration-300"
                >
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-slate-800">{quiz.name}</h3>
                        <p className="text-slate-600">
                            <span className="font-medium">Subject:</span> {quiz.name}
                        </p>
                        <p className="text-slate-600">
                            <span className="font-medium">Sections:</span> {quiz.sections.length}
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
    );
};

export default TopQuizzes;
