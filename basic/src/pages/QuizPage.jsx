import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import FullscreenProctor from '../utils/useProtoctor';
import QuizNavigationButtons from '../components/QuizNavigationButtons';
import QuizHeader from '../components/QuizHeader';
import QuestionDisplay from '../components/QuestionDisplay';
import SubmitExitControls from '../components/SubmitExitControls';
import SectionInfo from '../components/SectionInfo';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedQuiz = location.state?.quiz;

  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const currentSection = selectedQuiz?.sections[sectionIndex];
  const currentQuestion = currentSection?.questions[questionIndex];

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          handleNextQuestion();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(countdown);
  }, [questionIndex, sectionIndex]);

  const handleNextQuestion = () => {
    setTimer(30);
    if (questionIndex < currentSection.questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
    } else if (sectionIndex < selectedQuiz.sections.length - 1) {
      setSectionIndex(prev => prev + 1);
      setQuestionIndex(0);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (questionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
    } else if (sectionIndex > 0) {
      const prevSection = selectedQuiz.sections[sectionIndex - 1];
      setSectionIndex(sectionIndex - 1);
      setQuestionIndex(prevSection.questions.length - 1);
    }
  };

  const handleAnswerSelection = (questionId, selectedAnswer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: selectedAnswer
    }));
  };

  const handleSubmitQuiz = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      toast.error('User id not found', { position: 'top-center' });
      return;
    }

    const quizData = {
      userId,
      sections: selectedQuiz.sections.map(section => ({
        sectionId: section._id,
        answers: section.questions.map(question => ({
          questionId: question._id,
          selectedAnswer: selectedAnswers[question._id] || null
        }))
      }))
    };

    try {
      const response = await axios.post('http://localhost:5000/api/results/submit-quiz', quizData);
      toast.success('Quiz submitted successfully. Press Esc to exit fullscreen.', { position: 'top-center' });
      navigate('quiz-result', { state: { result: response.data }, replace: true });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const handleExitQuiz = () => {
    const confirmExit = window.confirm("Are you sure you want to exit the quiz? All progress will be lost.");
    if (confirmExit) {
      navigate('/student-dashboard');
    }
  };

  if (!selectedQuiz) return <p>No quiz data found. Please go back and select a quiz.</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <FullscreenProctor onExit={handleSubmitQuiz} />

      <QuizHeader title={selectedQuiz.name} timer={timer} />

      <div className="bg-white rounded-2xl shadow-md p-6 transition-all duration-300">
        <SectionInfo title={currentSection?.title} description={currentSection?.description} />
        <QuestionDisplay
          question={currentQuestion}
          sectionType={currentSection?.type}
          selectedAnswer={selectedAnswers[currentQuestion?._id]}
          onAnswerSelect={handleAnswerSelection}
        />
        <QuizNavigationButtons onNext={handleNextQuestion} />
      </div>

      <SubmitExitControls
        onBack={handlePreviousQuestion}
        onSubmit={handleSubmitQuiz}
        onExit={handleExitQuiz}
        disableBack={sectionIndex === 0 && questionIndex === 0}
      />
    </div>
  );
};

export default QuizPage;
