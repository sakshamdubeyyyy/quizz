const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  text: { type: String, required: true },
  options: { type: [String], required: true }, // Only for MCQ
  correctAnswer: { type: String, required: true } // value should match an option or "true"/"false"
});

module.exports = mongoose.model('Question', questionSchema);
