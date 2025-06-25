import React, { useEffect, useState } from 'react';
import { useGetQuizzes } from '../utils/useGetQuizzes';
import EditQuizModal from './EditQuizModal';
import { useDeleteQuiz } from '../utils/useDeleteQuiz';
import QuizManageCard from './QuizManageCard';

const ManageQuizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, error, isLoading } = useGetQuizzes();
    const { mutate: removeQuiz } = useDeleteQuiz();

    // console.log("ManageQuizzes data:", data); 
    useEffect(() => {
        if (data) setQuizzes(data.data);
        if (error) console.log(error);
    }, [data, error, isModalOpen]);

    const openEditModal = (quiz) => {
        setSelectedQuiz(quiz);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedQuiz(null);
        setIsModalOpen(false);
    };

    const deleteQuiz = (quizId) => {
        removeQuiz(quizId, {
            onSuccess: () => {
                setQuizzes((prevQuizzes) => prevQuizzes.filter((quiz) => quiz._id !== quizId));
                alert('Quiz deleted successfully!');
            }
        })
    };


    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
                Manage Quizzes
            </h1>

            {quizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <QuizManageCard
                            key={quiz._id}
                            quiz={quiz}
                            openEditModal={openEditModal}
                            deleteQuiz={deleteQuiz}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-gray-600">No quizzes available.</p>
            )}

            {isModalOpen && selectedQuiz && (
                <EditQuizModal quiz={selectedQuiz} onClose={closeModal} />
            )}
        </div>

    );
};

export default ManageQuizzes;
