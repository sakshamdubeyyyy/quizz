import { useState } from "react";
import SummaryCard from "../components/SummaryCard";
import ViewResults from "../components/ViewResults";
import AdminSideBar from "../components/AdminSideBar";
import TopQuizzes from "../components/TopQuizzes";
import { useNavigate } from "react-router-dom";
import TakeQuiz from "../components/TakeQuiz";
import { useGetUserById } from "../utils/useGetUserById";
import CodeEditor from "../components/CodeEditor";
import { useGetUserResults } from "../utils/useGetUserResults";
import UserSettings from "../components/UserSettings";
import CodingQuizzes from "../components/CodingQuizzes";

const StudentDashboard = () => {
  const [selectedButton, setSelectedButton] = useState("Dashboard");
  const userId = localStorage.getItem("userId");
  const {data : userData} = useGetUserById(userId);
  const {data: userResults} = useGetUserResults(userId);

  const summaryCardData = [
    { title: "Quizzes Taken", data: userResults?.length, icon: "✅" },
    { title: "Average Score", data: "82%", icon: "📊" },
    { title: "Completion Rate", data: "91%", icon: "📈" },
  ];

  const renderContent = () => {
    switch (selectedButton) {
      case "Dashboard":
        return (
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Welcome {userData?.name ?? 'loading..'}</h1>
            <div className="flex space-x-4">
              {summaryCardData.map((card, idx) => (
                <SummaryCard key={idx} {...card} />
              ))}
            </div>
            <h2 className="text-xl font-semibold mb-2 mt-4">Top Quizzes</h2>
            <TopQuizzes />
            <CodingQuizzes/>
          </div>
        );
      case "Take Quiz":
        return <TakeQuiz />;
      case "My Results":
        return <ViewResults />;
      case "Code Editor":
        return <CodeEditor />;
        case "Coding Quizzes":
          return <CodingQuizzes />;
      case "Settings":
        return <UserSettings/>;
      default:
        return null;
    }
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("ip");
    navigate("/login");
  };


  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSideBar
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        role="student"
        onLogout={handleLogout}
      />
      <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
    </div>

  );
};

export default StudentDashboard;
