import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

const FeatureCard = ({ darkMode, number, title, description }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovering, setHovering] = useState(false);

  // Background animation similar to HeroSection
  const animatedBackground = useTransform([x, y], ([latestX, latestY]) => {
    return `radial-gradient(circle at ${latestX}px ${latestY}px, ${
      darkMode ? "#58111A" : "#58111A"
    }, ${darkMode ? "#1F2937" : "#DB7093"})`;
  });
  
  const staticBackground = `radial-gradient(circle at center, ${
    darkMode ? "#58111A" : "#58111A"
  }, ${darkMode ? "#1F2937" : "#DB7093"})`;
  
  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={{
        background: hovering ? animatedBackground : staticBackground,
        transition: "background 0.5s ease",
      }}
      className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-2xl text-white shadow-md`}
    >
      <div
        className={`w-14 h-14 rounded-full ${
          darkMode ? "bg-indigo-500" : "bg-indigo-600"
        } flex items-center justify-center mb-4 shadow-lg`}
      >
        <span className="text-white font-extrabold text-xl">{number}</span>
      </div>
      <h3 className="text-2xl font-semibold mb-2 tracking-tight">{title}</h3>
      <p className={`text-base leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-100"}`}>
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
