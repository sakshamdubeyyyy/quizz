import React from 'react';
import TopQuizzes from './TopQuizzes';

const TakeQuiz = () => {
    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">📚 Available Quizzes</h2>
            <TopQuizzes />
        </div>
    );
};

export default TakeQuiz;
