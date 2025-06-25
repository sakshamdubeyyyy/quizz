import React from 'react';
import { LogIn } from 'lucide-react';

const RegisterSubmitButton = ({ onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-md"
    >
        <LogIn size={18} />
        Register
    </button>
);

export default RegisterSubmitButton;
