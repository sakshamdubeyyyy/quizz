const SubmitButton = ({ isLoading }) => {
    return (
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full text-white px-4 py-2 rounded ${isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isLoading ? 'Submitting...' : 'Submit All'}
      </button>
    );
  };
  
  export default SubmitButton;
  