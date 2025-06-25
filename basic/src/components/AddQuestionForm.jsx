const QuestionForm = ({ index, question, onChange }) => {
    const handleFieldChange = (field, value) => {
      onChange({ ...question, [field]: value });
    };
  
    const handleOptionChange = (optIdx, value) => {
      const newOptions = [...question.options];
      newOptions[optIdx] = value;
      onChange({ ...question, options: newOptions });
    };
  
    return (
      <div className="p-3 border rounded bg-yellow-50 space-y-2">
        <h4 className="font-medium">Question {index + 1}</h4>
        <textarea
          value={question.text}
          onChange={(e) => handleFieldChange('text', e.target.value)}
          placeholder="Question Text"
          className="w-full p-2 border rounded"
        />
        {question.options.map((opt, oIdx) => (
          <input
            key={oIdx}
            value={opt}
            onChange={(e) => handleOptionChange(oIdx, e.target.value)}
            placeholder={`Option ${oIdx + 1}`}
            className="w-full p-2 border rounded"
          />
        ))}
        <input
          value={question.correctAnswer}
          onChange={(e) => handleFieldChange('correctAnswer', e.target.value)}
          placeholder="Correct Answer"
          className="w-full p-2 border rounded"
        />
      </div>
    );
  };
  
  export default QuestionForm;
  