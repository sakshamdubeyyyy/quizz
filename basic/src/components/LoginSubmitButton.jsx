import React from 'react';

const LoginSubmitButton = ({ onClick, icon, label }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
    >
        {icon}
        {label}
    </button>
);

export default LoginSubmitButton;
