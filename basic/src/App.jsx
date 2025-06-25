import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoutes';
import AdminDashboard from './pages/AdminDashboard';
import RegisterPage from './pages/RegisterPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import CodeEditor from './components/CodeEditor';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute allowedRoles={['student']} />}>
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path='/quiz' element={<QuizPage/>} />
        <Route path='quiz/quiz-result' element={<ResultPage/>} />
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        <Route path='/coding-quiz' element={<CodeEditor/>} />
      </Routes>
    </Router>
  );
}

export default App;
