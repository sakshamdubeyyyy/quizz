const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['MCQ', 'TrueFalse'], required: true }
});

// Virtual field to populate questions for this section
sectionSchema.virtual('questions', {
  ref: 'Question',        // The model to populate
  localField: '_id',      // The field from the current model (Section)
  foreignField: 'section' // The field in the referenced model (Question)
});

sectionSchema.set('toObject', { virtuals: true });
sectionSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Section', sectionSchema);
