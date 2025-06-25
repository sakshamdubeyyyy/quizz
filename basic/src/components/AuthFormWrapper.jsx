import React from 'react';

const AuthFormWrapper = ({ title, subtitle, icon, darkMode }) => (
    <div className="text-center mb-6">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-indigo-500 mb-4">
            {icon}
        </div>
        <h2 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>
    </div>
);

export default AuthFormWrapper;
