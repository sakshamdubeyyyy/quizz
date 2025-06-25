import { useGetAllUsers } from "../utils/useGetAllUsers";
import { useGetQuizzes } from "../utils/useGetQuizzes";
import AdminResultsPage from "./AdminResultsPage";
import SummaryCard from "./SummaryCard";

const DashboardOverview = ({ onCreateQuiz }) => {
  const {data: quiz} = useGetQuizzes();
  const {data: users} = useGetAllUsers();
  
  const summaryCardData = [
    { title: "Total Quizzes", data: quiz?.data.length, icon: '📖' },
    { title: "Active Users", data: users?.data.length, icon: '👥' },
    { title: "Completion Rate", data: '87%', icon: '✅' },
    { title: "Average Score", data: '76%', icon: '📊' },
  ];

  return (
    <div className="p-6 md:p-8 border border-gray-200 rounded-2xl shadow-sm bg-white min-h-screen space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back Admin,</h1>
        <button
          onClick={onCreateQuiz}
          className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 py-2 rounded-lg shadow transition-all"
        >
          + Create New Quiz
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCardData.map((card, index) => (
          <SummaryCard
            key={index}
            title={card.title}
            data={card.data}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Recent Results */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Recent Results</h2>
        <AdminResultsPage />
      </div>
    </div>
  );
};

export default DashboardOverview;
