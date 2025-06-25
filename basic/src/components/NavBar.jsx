import { useState } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  

  const gradientClass = darkMode
    ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'
    : 'bg-gradient-to-br from-white via-indigo-100 to-purple-100';

  return (
    <>
      <nav className={`py-4 px-4 sticky top-0 shadow transition-colors duration-500 ${gradientClass} z-50`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="QuizMaster Logo" className="w-32 h-10 object-contain" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoginPage && (
              <>
                <Link to="/login">
                  <button className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors">Login</button>
                </Link>
                <Link to="/register">
                  <button className="px-3 py-1 border border-indigo-500 text-indigo-600 rounded hover:bg-indigo-500 hover:text-white transition-colors">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden ${gradientClass} py-4 shadow`}>
          <div className="max-w-6xl mx-auto flex flex-col gap-3 px-4">
            <Link to="/login" className="text-left px-2 py-1 hover:bg-indigo-500 hover:text-white rounded transition-colors">Login</Link>
            <Link to="/register" className="text-left px-2 py-1 border border-indigo-500 rounded hover:bg-indigo-500 hover:text-white transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
