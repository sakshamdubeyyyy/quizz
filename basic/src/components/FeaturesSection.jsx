import FeatureCard from "./FeatureCard";

const FeaturesSection = ({ darkMode }) => {
  const features = [
    {
      number: "1",
      title: "Diverse Quiz Categories",
      description:
        "From science and history to pop culture and sports, find quizzes that match your interests.",
    },
    {
      number: "2",
      title: "Compete with Friends",
      description:
        "Challenge friends, join leaderboards, and show off your quiz-taking skills to the world.",
    },
    {
      number: "3",
      title: "Track Your Progress",
      description:
        "See your improvement over time with detailed statistics and performance analytics.",
    },
  ];

  return (
    <div
      className={`py-16 px-6 md:px-12 transition-colors duration-500 ${darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-white via-indigo-100 to-purple-100 text-gray-900"
        }`}
    >

      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-4 tracking-tight">
          Why Choose <span className="text-indigo-500">QuizMaster</span>?
        </h2>
        <p className="text-center text-lg text-gray-500 dark:text-gray-300 mb-12">
          Explore our top features designed to enhance your quiz experience.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              darkMode={darkMode}
              number={feature.number}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
