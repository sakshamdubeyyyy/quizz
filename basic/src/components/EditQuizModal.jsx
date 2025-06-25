import React, { useState } from 'react';
import { useEditSection } from '../utils/useEditSection';
import { useEditSubject } from '../utils/useEditSubject';
import { useEditQuestion } from '../utils/useEditQUestion';
import { useAddQuestion } from '../utils/useAddQuestion';
import { useQueryClient } from '@tanstack/react-query';
import SubjectInput from './AddSubject';
import SectionsList from './AddSection';
import SubmitButton from './SubmitButton';
import { useAddSection } from '../utils/useAddSection';
import { toast } from 'react-toastify';

const EditQuizModal = ({ onClose, quiz }) => {
    const [subjectName, setSubjectName] = useState(quiz.name);
    const [sections, setSections] = useState(
        quiz.sections.map((section) => ({
            id: section.id,
            title: section.title,
            type: section.type,
            questions: section.questions.map((q) => ({
                id: q._id ?? null,
                text: q.text,
                options: q.options ?? ['', '', '', ''],
                correctAnswer: q.correctAnswer,
            })),
        }))
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient();

    const { mutateAsync: updateSection } = useEditSection();
    const { mutateAsync: updateSubject } = useEditSubject();
    const { mutateAsync: updateQuestion } = useEditQuestion();
    const { mutateAsync: createQuestion } = useAddQuestion();
    const { mutateAsync: createSection } = useAddSection();

    const subjectID = quiz.id;

    const handleSectionUpdate = (index, updatedSection) => {
        const newSections = [...sections];
        newSections[index] = updatedSection;
        setSections(newSections);
    };

    const addSectionField = () => {
        setSections([
            ...sections,
            {
                id: null,
                title: '',
                type: '',
                questions: [
                    { id: null, text: '', options: ['', '', '', ''], correctAnswer: '' },
                ],
            },
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!subjectName.trim()) return toast.alert('Subject name is required', { position: 'top-center', autoClose: 3000 });

        try {
            setIsSubmitting(true);

            // Update subject
            await updateSubject({ id: subjectID, name: subjectName });

            for (const section of sections) {
                let sectionId = section.id;

                if (sectionId) {
                    // Update existing section
                    await updateSection({ id: sectionId, title: section.title, type: section.type });
                } else {
                    // Create new section
                    const response = await createSection({ subject: subjectID, title: section.title, type: section.type });
                    sectionId = response.data._id;
                    section.id = sectionId;
                }

                // Update or create questions
                for (const question of section.questions) {
                    const payload = {
                        sectionId,
                        text: question.text,
                        options: question.options,
                        correctAnswer: question.correctAnswer,
                    };

                    if (question.id) {
                        await updateQuestion({ id: question.id, ...payload });
                    } else {
                        await createQuestion({
                            sectionId,
                            text: question.text,
                            options: question.options,
                            correctAnswer: question.correctAnswer,
                        });
                    }
                }
            }

            await queryClient.invalidateQueries(['quizzes']);
            toast.success('Quiz updated successfully', {
                position: 'top-center',
                autoClose: 3000,
            }); onClose();
        } catch (err) {
            console.error('Failed to update quiz:', err);
            toast.error('Failed to udate quiz.', {
                position: 'top-center',
                autoClose: 3000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-none bg-opacity-30 backdrop-blur-sm flex items-start justify-center overflow-y-auto py-10 px-4">
            <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-xl p-6 md:p-8">
                <div className="flex justify-between items-center border-b pb-4 mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Quiz</h2>
                    <button
                        type="button"
                        className="text-gray-500 hover:text-red-500 text-xl"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <SubjectInput subjectName={subjectName} setSubjectName={setSubjectName} />

                    <SectionsList
                        sections={sections}
                        handleSectionUpdate={handleSectionUpdate}
                        addSectionField={addSectionField}
                    />

                    <SubmitButton isLoading={isSubmitting} />
                </form>
            </div>
        </div>

    );
};

export default EditQuizModal;
