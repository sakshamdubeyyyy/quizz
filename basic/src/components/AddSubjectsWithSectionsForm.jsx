import { useState } from 'react';
import { useAddSubject } from '../utils/useAddSubject';
import { useAddSection } from '../utils/useAddSection';
import { useAddQuestion } from '../utils/useAddQuestion';
import SubjectInput from './AddSubject';
import SectionsList from './AddSection';
import SubmitButton from './SubmitButton';
import { toast } from 'react-toastify';


const AddSubjectWithSectionsForm = () => {
  const { mutate: addSubject, isLoading: subjectLoading } = useAddSubject();
  const { mutate: addSection } = useAddSection();
  const { mutate: addQuestion } = useAddQuestion();

  const [subjectName, setSubjectName] = useState('');
  const [sections, setSections] = useState([
    {
      title: '',
      type: '',
      questions: [
        {
          text: '',
          options: ['', '', '', ''],
          correctAnswer: '',
        },
      ],
    },
  ]);

  const handleSectionUpdate = (index, updatedSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  const addSectionField = () => {
    setSections([
      ...sections,
      {
        title: '',
        type: '',
        questions: [
          { text: '', options: ['', '', '', ''], correctAnswer: '' },
        ],
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subjectName.trim()) return toast.alert('Subject name is required!');

    addSubject(
      { name: subjectName },
      {
        onSuccess: async (subjectRes) => {
          try {
            const subjectId = subjectRes.data._id;

            for (const section of sections) {
              await new Promise((resolve, reject) => {
                addSection(
                  {
                    subject: subjectId,
                    title: section.title,
                    type: section.type,
                  },
                  {
                    onSuccess: (sectionRes) => {
                      const sectionId = sectionRes.data._id;

                      section.questions.forEach((question, i) => {
                        if (!question.text.trim() || !question.correctAnswer.trim()) {
                          console.error(
                            `Question ${i + 1} in section "${section.title}" is invalid`
                          );
                          return;
                        }

                        addQuestion({
                          sectionId,
                          text: question.text,
                          options: question.options,
                          correctAnswer: question.correctAnswer,
                        });
                      });

                      resolve();
                    },
                    onError: (error) => {
                      console.error(`Error adding section "${section.title}":`, error);
                      reject(error);
                    },
                  }
                );
              });
            }

            toast.success('Quiz Added successfully!', {
              position: 'top-center',
              autoClose: 3000,
            }); 
            setSubjectName('');
            setSections([
              {
                title: '',
                type: '',
                questions: [
                  { text: '', options: ['', '', '', ''], correctAnswer: '' },
                ],
              },
            ]);
          } catch (err) {
            console.error('Error during section/question creation:', err);
          }
        },
        onError: (error) => {
          console.error('Error adding subject:', error);
        },
      }
    );
  };



  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl space-y-6"
    >
      <SubjectInput subjectName={subjectName} setSubjectName={setSubjectName} />

      <SectionsList
        sections={sections}
        handleSectionUpdate={handleSectionUpdate}
        addSectionField={addSectionField}
      />

      <SubmitButton isLoading={subjectLoading} />
    </form>
  );
};

export default AddSubjectWithSectionsForm;
