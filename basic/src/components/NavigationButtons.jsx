const NavigationButtons = ({ currentIndex, total, onNext, onPrev }) => (
    <div className="flex justify-between items-center mt-6">
        <button
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50 transition"
        >
            ← Previous
        </button>
        <span className="text-gray-500 text-sm">
            {total > 0 && `Result ${currentIndex + 1} of ${total}`}
        </span>
        <button
            onClick={onNext}
            disabled={currentIndex === total - 1}
            className="px-4 py-2 text-sm rounded-lg bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 transition"
        >
            Next →
        </button>
    </div>
);

export default NavigationButtons;
