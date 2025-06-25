import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import useDarkMode from '../utils/useDarkMode';
import { User, Lock, LogIn, HomeIcon } from 'lucide-react';
import DarkModeToggle from '../components/DarkModeToggle';
import AuthFormWrapper from '../components/AuthFormWrapper';
import InputField from '../components/InputField';
import LoginSubmitButton from '../components/LoginSubmitButton';
import { toast } from 'react-toastify';
import { useLogin } from '../utils/UseLogin';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ip, setIp] = useState('');
    const [hovering, setHovering] = useState(false);
    const [darkMode, toggleDarkMode] = useDarkMode();
    const navigate = useNavigate();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const background = useTransform([x, y], ([latestX, latestY]) =>
        `radial-gradient(circle at ${latestX}px ${latestY}px, ${darkMode ? '#4F46E5' : '#6366F1'}, ${darkMode ? '#1F2937' : '#E5E7EB'})`
    );
    const staticBackground = `radial-gradient(circle at center, ${darkMode ? '#4F46E5' : '#6366F1'}, ${darkMode ? '#1F2937' : '#E5E7EB'})`;

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token && role) {
            navigate(role === 'admin' ? '/admin-dashboard' : '/student-dashboard', { replace: true });
        }
    }, []);

    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => setIp(data.ip))
            .catch(err => console.error('Failed to get IP address:', err));
    }, []);

    const { mutateAsync: loginMutation, isLoading } = useLogin();

    const handleSubmit = async () => {
        try {
            const res = await loginMutation({ email, password }); 
            const { token, payload } = res.data;
            const { id, role: userRole } = payload.user;

            localStorage.setItem('token', token);
            localStorage.setItem('role', userRole);
            localStorage.setItem('userId', id);
            localStorage.setItem('ip', ip);

            toast.success('Logged in successfully', { position: 'top-center', autoClose: 3000 });
            navigate(userRole === 'admin' ? '/admin-dashboard' : '/student-dashboard');
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || 'Login Failed', {
                position: 'top-center',
                autoClose: 3000,
            });
        }
    };

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center px-4"
            onMouseMove={(e) => {
                x.set(e.clientX);
                y.set(e.clientY);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
                background: hovering ? background : staticBackground,
                transition: 'background 0.3s ease',
            }}
        >
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <HomeIcon
                size={32}
                className={`absolute top-4 left-4 w-12 cursor-pointer hover:text-gray-600 transition-all ${darkMode ? 'text-white' : 'text-gray-900'}`}
                onClick={() => navigate('/')}
            />
            <div className={`w-full max-w-md p-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <AuthFormWrapper
                    title="Welcome Back"
                    subtitle="Please sign in to your account"
                    icon={<User size={32} className="text-white" />}
                />
                <div className="space-y-5">
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        icon={<User size={18} />}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        darkMode={darkMode}
                    />
                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        icon={<Lock size={18} />}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        darkMode={darkMode}
                    />
                    <LoginSubmitButton
                        onClick={handleSubmit}
                        icon={<LogIn size={18} />}
                        label={isLoading ? 'Logging in...' : 'Login'}
                    />
                    <div className={`text-center text-sm mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span>Don't have an account? </span>
                        <button
                            onClick={() => navigate('/register')}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LoginPage;
