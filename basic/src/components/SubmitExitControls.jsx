const SubmitExitControls = ({ onBack, onSubmit, onExit, disableBack }) => (
    <div className="flex justify-between items-center mt-10">
      <button
        className={`px-4 py-2 rounded-lg transition text-white ${disableBack ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700'}`}
        onClick={onBack}
        disabled={disableBack}
      >
        Back
      </button>
  
      <div className="space-x-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow transition"
          onClick={onSubmit}
        >
          Submit Quiz
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow transition"
          onClick={onExit}
        >
          Exit Quiz
        </button>
      </div>
    </div>
  );
  
  export default SubmitExitControls;
  