import QuestionList from './QuestionList';

const SectionForm = ({ index, section, onSectionChange }) => {
    const handleTitleChange = (e) => {
        onSectionChange({ ...section, title: e.target.value });
    };

    const handleTypeChange = (e) => {
        const selectedType = e.target.value;
        onSectionChange({ ...section, type: selectedType });
    };

    const handleQuestionUpdate = (qIdx, updatedQuestion) => {
        const updatedQuestions = [...section.questions];
        updatedQuestions[qIdx] = updatedQuestion;
        onSectionChange({ ...section, questions: updatedQuestions });
    };

    const addQuestionField = () => {
        onSectionChange({
            ...section,
            questions: [
                ...section.questions,
                { text: '', options: ['', '', '', ''], correctAnswer: '' },
            ],
        });
    };

    return (
        <div className="border border-gray-200 p-6 rounded-xl space-y-5 bg-white shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Section {index + 1}</h3>

            <input
                type="text"
                value={section.title}
                onChange={handleTitleChange}
                placeholder="Section Title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            />

            <select
                value={section.type}
                onChange={handleTypeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            >
                <option value="">Select Section Type</option>
                <option value="MCQ">MCQ</option>
                <option value="TrueFalse">True/False</option>
            </select>

            <QuestionList
                questions={section.questions}
                onQuestionChange={handleQuestionUpdate}
                addQuestionField={addQuestionField}
                sectionType={section.type}
            />
        </div>
    );
};

export default SectionForm;
