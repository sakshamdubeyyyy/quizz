import React from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => (
    <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 absolute top-4 right-4">
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
);

export default DarkModeToggle;
