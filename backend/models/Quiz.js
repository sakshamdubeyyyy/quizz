const mongoose = require('mongoose');

const TestCaseSchema = new mongoose.Schema({
  input: {type: String, required: true},
  expectedOutput: String,
  isHidden: { type: Boolean, default: false }
});

const QuestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  language: { type: String, enum: ['javascript', 'python'], required: true },
  starterCode: { type: String, default: '' },
  testCases: [TestCaseSchema],
  timeLimit: { type: Number, default: 0 }, // 0 means no time limit, otherwise in minutes
  points: { type: Number, default: 10 }
});

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  questions: [QuestionSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic: { type: Boolean, default: true },
  duration: { type: Number, default: 60 }, // in minutes
  passingScore: { type: Number, default: 70 }, // percentage
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
