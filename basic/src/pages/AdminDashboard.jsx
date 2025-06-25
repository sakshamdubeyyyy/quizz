import { useState } from "react";
import AdminSideBar from "../components/AdminSideBar";
import DashboardOverview from "../components/DashboardOverview";
import AddQuiz from "../components/AddQuiz";
import ManageQuizzes from "../components/ManageQuizzes";
import { useNavigate } from "react-router-dom";
import AdminResultsPage from "../components/AdminResultsPage";
import AdminSettings from "../components/AdminSettings";
import AddCodeQuiz from "../components/AddCodeQuiz";

const AdminDashboard = () => {
  const [selectedButton, setSelectedButton] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("ip");
    navigate("/login");
  };

  const renderContent = () => {
    switch (selectedButton) {
      case "Dashboard":
        return (
          <DashboardOverview onCreateQuiz={() => setSelectedButton("Add Quiz")} />
        );
      case "Add Quiz":
        return <AddQuiz />;
      case "Manage Quizes":
        return <ManageQuizzes />;
      case "View Results":
        return <AdminResultsPage />;
      case "Settings":
        return <AdminSettings />   
      case "Add Coding Quiz":
        return <AddCodeQuiz />         
      
      default:
        return <DashboardOverview onCreateQuiz={() => setSelectedButton("Add Quiz")} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <AdminSideBar
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
        role="admin"
        onLogout={handleLogout}
      />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 min-h-full transition-all duration-300">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;