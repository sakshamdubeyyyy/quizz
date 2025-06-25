import { useNavigate } from "react-router-dom";

const QuizCard = ({ darkMode, title, description, questions, img }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`rounded-2xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-all duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
        }`}
    >
      <img src={img} alt="image"/>

      {/* Content */}
      <div className={`p-6 h-40  ${darkMode
          ? 'bg-gradient-to-br from-indigo-700 via-purple-700 to-indigo-800'
          : 'bg-gradient-to-br from-indigo-200 via-purple-200 to-indigo-300'
        }`}>
        <h3 className="text-xl font-bold mb-2 tracking-tight">{title}</h3>
        <p className="text-sm mb-4 opacity-80">{description}</p>

        <div className="flex justify-between items-center">
          <span className="text-sm font-medium opacity-70">
            {questions} questions
          </span>
          <button
            className="px-4 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md text-sm font-medium transition-colors duration-300"
            onClick={() => navigate("/login")}
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;
