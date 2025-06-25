import AnswerCard from './AnswerCard';
import NavigationButtons from './NavigationButtons';

const ResultDetails = ({ result, currentIndex, total, onNext, onPrev }) => (
    <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
        <div className="mb-4">
            <h2 className="text-xl font-semibold text-blue-700">📚 Section: {result.section.title}</h2>
            <p className="text-gray-600 mt-1"><strong>Date:</strong> {new Date(result.date).toLocaleString()}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
            <p><strong>Total Questions:</strong> {result.totalQuestions}</p>
            <p><strong>Correct Answers:</strong> {result.correctAnswers}</p>
            <p><strong>Score:</strong> <span className="font-medium text-green-600">{result.score}/{result.totalQuestions}</span></p>
        </div>

        <div>
            <h3 className="font-medium text-md text-gray-800 mb-3 border-b pb-1">📝 Your Answers</h3>
            {result.userAnswers.map((answer, index) => (
                <AnswerCard key={answer._id} answer={answer} index={index} />
            ))}
        </div>

        <NavigationButtons
            currentIndex={currentIndex}
            total={total}
            onNext={onNext}
            onPrev={onPrev}
        />
    </div>
);

export default ResultDetails;
