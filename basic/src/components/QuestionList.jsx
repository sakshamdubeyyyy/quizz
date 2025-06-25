const QuestionList = ({ questions, onQuestionChange, addQuestionField, sectionType }) => {
    const handleFieldChange = (qIdx, field, value) => {
        const updated = { ...questions[qIdx], [field]: value };
        onQuestionChange(qIdx, updated);
    };

    const handleOptionChange = (qIdx, optIdx, value) => {
        const updatedOptions = [...questions[qIdx].options];
        updatedOptions[optIdx] = value;
        const updated = { ...questions[qIdx], options: updatedOptions };
        onQuestionChange(qIdx, updated);
    };

    return (
        <div className="space-y-4">
            {questions.map((q, qIdx) => (
                <div key={qIdx} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm space-y-3">
                    <input
                        type="text"
                        value={q.text}
                        onChange={(e) => handleFieldChange(qIdx, 'text', e.target.value)}
                        placeholder={`Question ${qIdx + 1} Text`}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />

                    {sectionType === 'MCQ' ? (
                        q.options.map((opt, optIdx) => (
                            <input
                                key={optIdx}
                                type="text"
                                value={opt}
                                onChange={(e) => handleOptionChange(qIdx, optIdx, e.target.value)}
                                placeholder={`Option ${optIdx + 1}`}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            />
                        ))
                    ) : sectionType === 'TrueFalse' ? (
                        <>
                            <input
                                type="text"
                                value="True"
                                disabled
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                            />
                            <input
                                type="text"
                                value="False"
                                disabled
                                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                            />
                        </>
                    ) : null}

                    {sectionType === 'MCQ' ? (
                        <input
                            type="text"
                            value={q.correctAnswer}
                            onChange={(e) => handleFieldChange(qIdx, 'correctAnswer', e.target.value)}
                            placeholder="Correct Answer"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        />
                    ) : sectionType === 'TrueFalse' ? (
                        <select
                            value={q.correctAnswer}
                            onChange={(e) => handleFieldChange(qIdx, 'correctAnswer', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                        >
                            <option value="">Select Correct Answer</option>
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>
                    ) : null}
                </div>
            ))}

            <button
                type="button"
                onClick={addQuestionField}
                className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
            >
                + Add Another Question
            </button>
        </div>
    );
};

export default QuestionList;
