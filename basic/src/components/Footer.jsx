const Footer = ({ darkMode }) => {
    return (
      <footer className={`py-12 px-4 transition-colors duration-500 ${darkMode
        ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
        : "bg-gradient-to-br from-white via-indigo-300 to-purple-400 text-gray-900"
        }`}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
  
            {/* Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {['About', 'Privacy', 'Terms', 'Contact'].map((item) => (
                <a key={item} href="#" className="hover:text-indigo-500">
                  {item}
                </a>
              ))}
            </div>
          </div>
  
          <div className="mt-6 text-center text-xs opacity-70">
            &copy; {new Date().getFullYear()} QuizMaster. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  