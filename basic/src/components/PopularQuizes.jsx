import { useNavigate } from "react-router-dom";
import QuizCard from "./QuizCard";

const PopularQuizzesSection = ({ darkMode }) => {
  const navigate = useNavigate();
  const quizzes = [
    {
      title: 'World Geography',
      description: 'Test your knowledge of countries, capitals, and landmarks.',
      questions: '15',
      color: 'bg-indigo-400',
      img: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Science Trivia',
      description: 'Explore the wonders of physics, chemistry, and biology.',
      questions: '20',
      color: 'bg-green-400',
      img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      title: 'Movie Buffs',
      description: 'Challenge yourself with questions about classic and modern films.',
      questions: '12',
      color: 'bg-amber-400',
      img: 'https://images.unsplash.com/photo-1585432959449-b1c9c8cc49ac?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];

  return (
    <div
      className={`py-12 px-4 overflow-x-hidden transition-colors duration-500 ${darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-white via-indigo-200 to-purple-300 text-gray-900"
        }`}
    >

      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Quizzes</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <QuizCard
              img={quiz.img}
              key={index}
              darkMode={darkMode}
              title={quiz.title}
              description={quiz.description}
              questions={quiz.questions}
              color={quiz.color}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className={`px-6 py-2 rounded-md border ${darkMode ? 'border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white' : 'border-indigo-500 text-indigo-600 hover:bg-indigo-500 hover:text-white'}`}
            onClick={() => navigate("/login")}
          >
            View All Quizzes
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularQuizzesSection;