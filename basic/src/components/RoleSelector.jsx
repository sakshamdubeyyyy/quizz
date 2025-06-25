import React from 'react';

const RoleSelector = ({ role, setRole, darkMode }) => (
    <div>
        <label htmlFor="role" className="block text-sm font-medium mb-1">Role</label>
        <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-100 border-gray-300'}`}
        >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
        </select>
    </div>
);

export default RoleSelector;
