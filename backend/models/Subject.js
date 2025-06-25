const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }
});

// Virtual field to populate sections for this subject
subjectSchema.virtual('sections', {
  ref: 'Section',          // The model to populate
  localField: '_id',       // The field from the current model (Subject)
  foreignField: 'subject'  // The field in the referenced model (Section)
});

subjectSchema.set('toObject', { virtuals: true });
subjectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Subject', subjectSchema);
