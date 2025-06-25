import React from 'react';

const InputField = ({ label, id, type = 'text', icon, value, onChange, placeholder, darkMode }) => (
    <div>
        <label htmlFor={id} className={`block text-sm font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            {label}
        </label>
        <div className={`flex items-center border rounded-md px-3 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
            {icon && <div className={`mr-2 ${darkMode ? 'text-gray-400, fill-gray-400' : 'text-gray-500'}`}>{icon}</div>}
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`w-full py-2 outline-none ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

export default InputField;
