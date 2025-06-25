const QuestionDisplay = ({ question, sectionType, selectedAnswer, onAnswerSelect }) => {
    const options = sectionType === "TrueFalse" ? ["True", "False"] : question?.options || [];
  
    return (
      <div className="space-y-3">
        <p className="text-lg font-medium text-gray-700 mb-4">{question?.text}</p>
        {options.map((option, idx) => (
          <label key={idx} className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition">
            <input
              type="radio"
              name={`question-${question._id}`}
              checked={selectedAnswer === option}
              value={option}
              onChange={() => onAnswerSelect(question._id, option)}
              className="form-radio h-5 w-5 text-indigo-600"
            />
            <span className="text-gray-800">{option}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default QuestionDisplay;
  