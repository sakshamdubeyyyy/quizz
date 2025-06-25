const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const Question = require('../models/Question');

// GET all results of a specific user
router.get('/:userId', async (req, res) => {
  try {
    const results = await Result.find({ user: req.params.userId })
      .populate({ path: 'user', select: 'name' })
      .populate({ path: 'section', select: 'title' })
      .populate({ path: 'userAnswers.question', select: 'text' })
      .populate({ path: 'subject', select: 'name' });

    res.json(results);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// GET all results (formatted)
router.get('/allResults/all', async (req, res) => {
  try {
    const results = await Result.find()
      .populate('user', 'name email')
      .populate('subject', 'name')
      .populate('section', 'title')
      .populate({
        path: 'userAnswers.question',
        select: 'text correctAnswer section',
        populate: {
          path: 'section',
          select: 'title'
        }
      });

    const formattedResults = await Promise.all(results.map(async (result) => {
      const sectionMap = {};

      for (let ans of result.userAnswers) {
        const question = ans.question;
        if (!question) continue;

        const section = question.section;
        const sectionId = section?._id?.toString() || 'default';

        if (!sectionMap[sectionId]) {
          sectionMap[sectionId] = {
            title: section?.title || 'General',
            questions: []
          };
        }

        sectionMap[sectionId].questions.push({
          text: question.text,
          correctAnswer: question.correctAnswer,
          userAnswers: [{
            selectedAnswer: ans.selectedAnswer,
            isCorrect: ans.isCorrect
          }]
        });
      }

      const sections = Object.values(sectionMap);

      return {
        date: result.date,
        correctAnswers: result.correctAnswers,
        totalQuestions: result.totalQuestions,
        user: {
          id: result.user._id,
          name: result.user.name,
          email: result.user.email
        },
        subject: {
          id: result.subject._id,
          name: result.subject.name,
          sections
        }
      };
    }));

    res.json(formattedResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// DELETE all results
router.delete('/deleteAll', async (req, res) => {
  try {
    const deleted = await Result.deleteMany({});
    res.json({
      message: 'All results deleted successfully.',
      deletedCount: deleted.deletedCount
    });
  } catch (err) {
    console.error('Error deleting results:', err.message);
    res.status(500).json({ error: 'Server error while deleting results' });
  }
});

// DELETE a specific result
router.delete('/delete/:id', async (req, res) => {
  try {
    const result = await Result.findById(req.params.id);
    if (!result) return res.status(404).json({ msg: 'Result not found' });

    await Result.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Result deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Result not found' });
    res.status(500).send('Server error');
  }
});

// POST submit-quiz
router.post('/submit-quiz', async (req, res) => {
  const { userId, sections } = req.body;
  let totalScore = 0;
  let allUserAnswers = [];

  for (const sectionData of sections) {
    const { sectionId, answers } = sectionData;

    const questions = await Question.find({ section: sectionId }).populate({
      path: 'section',
      select: 'subject',
    });

    let score = 0;
    const userAnswers = [];

    for (const q of questions) {
      const userAns = answers.find(a => a.questionId === q._id.toString());
      const isCorrect = userAns && userAns.selectedAnswer === q.correctAnswer;

      if (isCorrect) score++;

      userAnswers.push({
        question: q._id,
        questionText: q.text,
        selectedAnswer: userAns ? userAns.selectedAnswer : null,
        correctAnswer: q.correctAnswer,
        isCorrect
      });
    }

    totalScore += score;

    const subject = questions[0]?.section?.subject;
    if (!subject) return res.status(400).json({ message: 'Subject is missing for the section' });

    const result = new Result({
      user: userId,
      subject,
      section: sectionId,
      score,
      totalQuestions: questions.length,
      correctAnswers: score,
      userAnswers
    });

    await result.save();

    allUserAnswers.push({ sectionId, userAnswers });
  }

  res.json({
    message: 'Quiz submitted',
    totalScore,
    allUserAnswers
  });
});

// DELETE all results of a specific user
router.delete('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const deleted = await Result.deleteMany({ user: userId });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: 'No results found for this user.' });
    }

    res.json({
      message: 'Results deleted successfully for the user.',
      deletedCount: deleted.deletedCount
    });
  } catch (err) {
    console.error('Error deleting user results:', err.message);
    res.status(500).json({ error: 'Server error while deleting user results' });
  }
});


module.exports = router;
