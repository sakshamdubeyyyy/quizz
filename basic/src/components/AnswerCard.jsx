const AnswerCard = ({ answer, index }) => (
    <div className="bg-white p-3 mb-3 rounded-lg border border-gray-200 shadow-sm">
        <p className="mb-1"><strong>Q{index + 1}:</strong> {answer.question.text}</p>
        <p className="mb-1"><strong>Your Answer:</strong> {answer.selectedAnswer}</p>
        <p>
            <strong>Result:</strong> {answer.isCorrect ? (
                <span className="text-green-600 font-medium">✅ Correct</span>
            ) : (
                <span className="text-red-500 font-medium">❌ Incorrect</span>
            )}
        </p>
    </div>
);

export default AnswerCard;
