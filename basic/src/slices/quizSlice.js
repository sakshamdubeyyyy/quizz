import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSubject: null,
  currentSection: null,
  currentQuestions: []
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setSubject: (state, action) => {
      state.currentSubject = action.payload;
    },
    setSection: (state, action) => {
      state.currentSection = action.payload;
    },
    setQuestions: (state, action) => {
      state.currentQuestions = action.payload;
    }
  }
});

export const { setSubject, setSection, setQuestions } = quizSlice.actions;
export default quizSlice.reducer;
