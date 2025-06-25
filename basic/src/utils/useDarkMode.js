import React, { useEffect, useState } from 'react';

const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const localPref = localStorage.getItem('darkMode');
    const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localPref === 'true' || (localPref === null && systemPref)) {
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('darkMode', newMode.toString());
      return newMode;
    });
  };

  return [darkMode, toggleDarkMode];
};

export default useDarkMode;
