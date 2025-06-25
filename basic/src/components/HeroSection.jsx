import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const HeroSection = ({ darkMode }) => {
  const navigate = useNavigate();

  // Motion values for cursor position
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovering, setHovering] = useState(false);

  // Interactive gradient on hover
  const background = useTransform([x, y], ([latestX, latestY]) => {
    return `radial-gradient(circle at ${latestX}px ${latestY}px, ${
      darkMode ? "#4F46E5" : "#6366F1"
    }, ${darkMode ? "#1F2937" : "#E5E7EB"})`;
  });

  // Static center gradient as fallback/default
  const staticBackground = `radial-gradient(circle at center, ${
    darkMode ? "#4F46E5" : "#6366F1"
  }, ${darkMode ? "#1F2937" : "#E5E7EB"})`;

  return (
    <motion.section
      className="relative py-16 px-4 overflow-hidden"
      onMouseMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        background: hovering ? background : staticBackground,
        transition: "background 0.3s ease",
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Challenge Your Knowledge
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">
          Take quizzes on various topics, compete with friends, and track your
          progress with our interactive quiz platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            onClick={() => navigate("/login")}
            className="bg-indigo-500 text-white px-6 py-3 rounded-md text-lg font-medium"
            whileHover={{
              backgroundColor: "#4F46E5",
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            Start a Quiz
          </motion.button>

          <motion.button
            onClick={() => navigate("/login")}
            className={`px-6 py-3 rounded-md text-lg font-medium ${
              darkMode ? "text-white" : "text-black"
            }`}
            style={{
              backgroundColor: darkMode ? "#1F2937" : "#E5E7EB",
            }}
            whileHover={{
              backgroundColor: darkMode ? "#374151" : "#D1D5DB",
              scale: 1.05,
              transition: { duration: 0.3 },
            }}
          >
            Browse Categories
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};

export default HeroSection;
