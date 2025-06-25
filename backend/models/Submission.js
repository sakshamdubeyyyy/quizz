const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  question: { type: mongoose.Schema.Types.ObjectId },
  code: { type: String, required: true },
  language: { type: String, enum: ['javascript', 'python'], required: true },
  results: [{
    testCase: Number,
    passed: Boolean,
    output: String,
    error: String
  }],
  isCorrect: { type: Boolean, default: false },
  executionTime: { type: Number }, 
}, { timestamps: true });

module.exports = mongoose.model('Submission', SubmissionSchema);
