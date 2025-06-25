import { motion } from 'framer-motion';
import Navbar from '../components/NavBar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import PopularQuizzesSection from '../components/PopularQuizes';
import Footer from '../components/Footer';
import useDarkMode from '../utils/useDarkMode';

export default function Home() {
  const [darkMode, toggleDarkMode] = useDarkMode();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className={`min-h-screen overflow-x-hidden ${darkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}
    >
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <HeroSection darkMode={darkMode} />
      </motion.div>

      <motion.div
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        viewport={{ once: true }}
      >
        <FeaturesSection darkMode={darkMode} />
      </motion.div>

      <motion.div
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <PopularQuizzesSection darkMode={darkMode} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Footer darkMode={darkMode} />
      </motion.div>
    </motion.div>
  );
}
