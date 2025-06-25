import { Edit, Trash2 } from 'lucide-react';
import React from 'react';

const QuizManageCard = ({ quiz, openEditModal, deleteQuiz }) => {
    return (
        <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-lg p-6 relative flex flex-col justify-between h-full">
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{quiz.name}</h2>
                <p className="text-gray-700 text-sm"><strong>Subject:</strong> {quiz.name}</p>
                <p className="text-gray-700 text-sm mt-1"><strong>Sections:</strong> {quiz.sections.length}</p>
            </div>

            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    className="text-gray-500 hover:text-blue-600"
                    title="Edit Quiz"
                    onClick={() => openEditModal(quiz)}
                >
                    <Edit size={20} />
                </button>
                <button
                    className="text-gray-500 hover:text-red-600"
                    title="Delete Quiz"
                    onClick={() => deleteQuiz(quiz._id)}
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
};

export default QuizManageCard;
