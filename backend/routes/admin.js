const express = require('express');
const router = express.Router();
const Subject = require('../models/Subject');
const Section = require('../models/Section');
const Question = require('../models/Question');
const { route } = require('./auth');

// Add subject
router.post('/subject', async (req, res) => {
    const { name } = req.body;
    const existingSubject = await Subject.find({ name });
    if (existingSubject.length > 0) {
        return res.status(400).json({ error: 'Subject already exists' });
    }
    try {
        const subject = await Subject.create({ name });
        res.status(201).json(subject);
    } catch (err) {
        res.status(500).json({ error: err.message });
        console.error(err.message);
    }
});

// Add section
router.post('/section', async (req, res) => {
    const { subject, title, type } = req.body;
    try {
        const section = await Section.create({ subject, title, type });
        res.status(201).json(section);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add question
router.post('/question', async (req, res) => {
    const { sectionId, text, options, correctAnswer } = req.body;
    try {
        const question = await Question.create({
            section: sectionId,
            text,
            options: options || [],
            correctAnswer
        });
        res.status(201).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/sections', async (req, res) => {
    try {
        const sections = await Section.find().populate('subject', 'name');
        res.status(200).json(sections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all quizzes
router.get('/quizzes', async (req, res) => {
    try {
        const quizzes = await Subject.find()
            .populate({
                path: 'sections',
                populate: {
                    path: 'questions',
                },
            });

        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/section/:id', async (req, res) => {
    const { title, type } = req.body;

    if (!title || !type) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const section = await Section.findByIdAndUpdate(req.params.id, { title, type }, { new: true });
        if (!section) {
            return res.status(404).json({ error: 'Section not found' });
        }
        res.status(200).json(section);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put("/question/:id", async (req, res) => {
    const { id } = req.params;
    const { text, options, correctAnswer } = req.body;

    if (!id || !text || !options || !correctAnswer) {
        return res.status(400).json({ message: "Missing required fields or invalid ID" });
    }

    try {
        const question = await Question.findByIdAndUpdate(id, { text, options, correctAnswer }, { new: true });
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }
        res.status(200).json(question);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.put("/subject/:id", async(req, res) => {
    const {name} = req.body;

    if(!name){
        return res.status(400).json({ message: "Missing required fields" });
    }

    try{
        const subject = await Subject.findByIdAndUpdate(req.params.id, {name})
        if(!subject){
            return res.status(404).json({ error: 'Section not found' });
        }
        res.status(200).json(subject);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

// DELETE /api/quizzes/:id
router.delete('/quizzes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const subject = await Subject.findById(id).populate('sections');
        if (!subject) return res.status(404).json({ error: 'Quiz not found' });

        // Delete all questions in each section
        for (const section of subject.sections) {
            await Question.deleteMany({ _id: { $in: section.questions } });
        }

        // Delete all sections
        await Section.deleteMany({ _id: { $in: subject.sections } });

        // Delete the subject (quiz)
        await Subject.findByIdAndDelete(id);

        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
