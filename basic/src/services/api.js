import axios from 'axios';
const API_BASE_URL = 'http://localhost:5000/api/admin';
// Create Subject
export const createSubject = (data) => axios.post(`${API_BASE_URL}/subject`, data);

// Create Section
export const createSection = (data) => axios.post(`${API_BASE_URL}/section`, data);

// Create Question
export const createQuestion = (data) => axios.post(`${API_BASE_URL}/question`, data);

// Get Sections with populated subjects
export const getSections = () => axios.get(`${API_BASE_URL}/sections`);

// Get Questions with populated sections and subjects
export const getQuizzes = () => axios.get(`${API_BASE_URL}/quizzes`);

//Edit Section
export const editSection = ({ id, ...data }) => axios.put(`${API_BASE_URL}/section/${id}`, data);

//Edit Question
export const editQuestion = ({ id, ...data }) => axios.put(`${API_BASE_URL}/question/${id}`, data);

//Edit Subject
export const editSubject = ({ id, ...data }) => axios.put(`${API_BASE_URL}/subject/${id}`, data);

//Delete Quiz
export const deleteQuiz = (id) => axios.delete(`${API_BASE_URL}/quizzes/${id}`);

const RESULTS_API_BASE_URL = 'http://localhost:5000/api/results';
//get user results
export const getUserResults = (userId) => axios.get(`${RESULTS_API_BASE_URL}/${userId}`);

//get all results
export const getAllResults = () => axios.get(`${RESULTS_API_BASE_URL}/allResults/all`);

const USER_API_BASE_URL = 'http://localhost:5000/api/users';

//get all users
export const getAllUsers = () => axios.get(`${USER_API_BASE_URL}`);

//get user by id
export const getUserById = (userId) => axios.get(`${USER_API_BASE_URL}/${userId}`);

const AUTH_API_BASE_URL = 'http://localhost:5000/api/auth';
//login user
export const loginUser = (data) => axios.post(`${AUTH_API_BASE_URL}/login`, data);

//register user
export const registerUser = (data) => axios.post(`${AUTH_API_BASE_URL}/register`, data);

const CODE_API_BASE_URL = 'http://localhost:5000/api/code';
export const getCodingQuizzes = () => axios.get(`${CODE_API_BASE_URL}`)
