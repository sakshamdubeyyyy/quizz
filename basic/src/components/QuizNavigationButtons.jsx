const QuizNavigationButtons = ({ onNext }) => (
    <div className="mt-6 flex justify-end">
      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg shadow transition"
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
  
  export default QuizNavigationButtons;
  