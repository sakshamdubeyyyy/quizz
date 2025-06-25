const QuizHeader = ({ title, timer }) => (
    <h1 className="text-3xl font-bold text-gray-800 mb-6 flex justify-between">
      <span>{title}</span>
      <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">{timer}s</span>
    </h1>
  );
  
  export default QuizHeader;
  