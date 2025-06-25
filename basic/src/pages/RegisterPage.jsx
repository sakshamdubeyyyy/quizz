import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../utils/useDarkMode';
import { User, AtSign, Lock, HomeIcon } from 'lucide-react';
import DarkModeToggle from '../components/DarkModeToggle';
import AuthFormWrapper from '../components/AuthFormWrapper';
import InputField from '../components/InputField';
import RegisterSubmitButton from '../components/RegisterSubmitButton';
import { toast } from 'react-toastify';
import { useRegister } from '../utils/useRegister';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [darkMode, toggleDarkMode] = useDarkMode();
    const navigate = useNavigate();

    const { mutate: register } = useRegister();

    const handleRegister = () => {
        register(
            {
                name,
                email,
                password,
                role: 'student',
            },
            {
                onSuccess: () => {
                    toast.success('Registration successful! Please log in.', {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                    navigate('/login');
                },
                onError: (error) => {
                    console.error(error);
                    toast.error(error?.response?.data?.message || 'Registration failed!', {
                        position: 'top-center',
                        autoClose: 3000,
                    });
                },
            }
        );
    };


    // Framer Motion Gradient Hover Setup
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [hovering, setHovering] = useState(false);

    const background = useTransform([x, y], ([latestX, latestY]) => {
        return `radial-gradient(circle at ${latestX}px ${latestY}px, ${darkMode ? '#4F46E5' : '#6366F1'
            }, ${darkMode ? '#1F2937' : '#E5E7EB'})`;
    });

    const staticBackground = `radial-gradient(circle at center, ${darkMode ? '#4F46E5' : '#6366F1'
        }, ${darkMode ? '#1F2937' : '#E5E7EB'})`;

    return (
        <motion.div
            className="min-h-screen flex items-center justify-center"
            onMouseMove={(e) => {
                x.set(e.clientX);
                y.set(e.clientY);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            style={{
                background: hovering ? background : staticBackground,
                transition: 'background 0.3s ease',
                color: darkMode ? '#ffffff' : '#111827',
            }}
        >
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <HomeIcon
                size={32}
                className={`absolute top-4 left-4 w-12 cursor-pointer hover:text-gray-600 transition-all ${darkMode ? 'text-white' : 'text-gray-900'
                    }`}
                onClick={() => navigate('/')}
            />
            <div
                className={`w-full max-w-md p-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'
                    }`}
            >
                <AuthFormWrapper
                    title="Create Account"
                    subtitle={darkMode ? 'Sign up to get started' : 'Please fill the form to register'}
                    icon={<User size={32} className="text-white" />}
                />

                <div className="space-y-5">
                    <InputField
                        label="Name"
                        id="name"
                        type="text"
                        icon={<User size={18} />}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        darkMode={darkMode}
                    />
                    <InputField
                        label="Email"
                        id="email"
                        type="email"
                        icon={<AtSign size={18} />}
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
                        placeholder="Create a password"
                        darkMode={darkMode}
                    />
                    <RegisterSubmitButton onClick={handleRegister} />
                    <div className="text-center text-sm">
                        <p>
                            Already have an account?{' '}
                            <a href="/login" className="text-indigo-500 hover:underline">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default RegisterPage;
