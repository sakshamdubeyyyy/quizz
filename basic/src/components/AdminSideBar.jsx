import React from 'react';
import logo from '../assets/logo.png';

const AdminSideBar = ({ selectedButton, setSelectedButton, role, onLogout }) => {
    const buttons =
        role === "admin"
            ? ["Dashboard", "Add Quiz", "Manage Quizes", "View Results", "Settings", "Add Coding Quiz"]
            : ["Dashboard", "Take Quiz", "My Results", "Settings", "Code Editor", "Coding Quizzes"];

    return (
        <div className="w-1/5 min-w-[200px] h-full bg-white shadow-lg p-4 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-2 mb-6">
                    <img src={logo} alt="QuizMaster Logo" className="w-32 h-10 object-contain cursor-pointer" />
                </div>
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedButton(button)}
                        className={`w-full text-left px-4 py-2 my-1 rounded-lg transition-all duration-200 font-medium
          ${selectedButton === button ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50 text-gray-700'}`}
                    >
                        {button}
                    </button>
                ))}
            </div>
            <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 mt-4 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
            >
                🚪 Logout
            </button>
        </div>

    );
};

export default AdminSideBar;
