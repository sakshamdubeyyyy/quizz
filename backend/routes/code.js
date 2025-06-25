const express = require('express');
const router = express.Router();
const { exec, execFile } = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');
const Quiz = require('../models/Quiz');
const Submission = require('../models/Submission');

// Create a new quiz
router.post('/', async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/", async(req, res) => {
  try{
    const quiz = await Quiz.find();
    res.status(200).json(quiz);
  }catch{
    res.status(400).json({ message: err.message });
  }
})

// Update a quiz
router.put('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a quiz
router.delete('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ message: 'Quiz deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const mongoose = require('mongoose');

router.post('/submitCode', async (req, res) => {
  const { userId, quizId, questionId, code, language } = req.body;

  if (!code || !language || !quizId || !questionId || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ message: 'Invalid quizId' });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

    const question = quiz.questions.id(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });

    const fileId = crypto.randomBytes(16).toString('hex');
    const ext = language === 'python' ? 'py' : 'js';
    const filename = path.join(__dirname, '../temp', `${fileId}.${ext}`);

    await fs.writeFile(filename, code);

    let results = [], allPassed = true, totalTime = 0;

    for (let i = 0; i < question.testCases.length; i++) {
      const tc = question.testCases[i];
      let execOutput = '', passed = false, error = '';
      const start = Date.now();

      try {
        if (language === 'python') {
          execOutput = await executeCodePython(filename, tc.input);
        } else {
          execOutput = await executeCodeJavaScript(filename, tc.input);
        }

        const execTime = Date.now() - start;
        totalTime += execTime;

        passed = execOutput.trim() === tc.expectedOutput.trim();
        allPassed = allPassed && passed;

        results.push({
          testCase: i,
          passed,
          output: execOutput,
          error: null
        });
      } catch (err) {
        results.push({
          testCase: i,
          passed: false,
          output: '',
          error: err.message
        });
        allPassed = false;
      }
    }

    await fs.unlink(filename);

    const submission = new Submission({
      user: userId,
      quiz: quizId,
      question: questionId,
      code,
      language,
      results,
      isCorrect: allPassed,
      executionTime: totalTime
    });

    await submission.save();

    res.json({ success: true, results, isCorrect: allPassed });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});


router.post('/submitCoding', async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Create a unique filename
    const fileId = crypto.randomBytes(16).toString('hex');
    const filename = path.join(__dirname, '../temp', `${fileId}.${language === 'python' ? 'py' : 'js'}`);

    // Write code to file
    await fs.writeFile(filename, code);

    let output;
    if (language === 'python') {
      output = await executeCodePython(filename);
    } else {
      output = await executeCodeJavaScript(filename);
    }

    // Clean up the file
    await fs.unlink(filename);

    // Respond with the output
    res.json({ success: true, output });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



function executeCodePython(filename, input = '') {
  return new Promise((resolve, reject) => {
    execFile('python', [filename], { timeout: 5000, input }, (error, stdout, stderr) => {
      if (error && error.killed) {
        console.error('Python execution timed out:', error);
        reject(new Error('Execution timed out'));
      } else if (stderr) {
        console.error('Python stderr:', stderr);
        reject(new Error(stderr));
      } else {
        console.log('Python execution stdout:', stdout);
        resolve(stdout.trim());
      }
    });
  });
}

function executeCodeJavaScript(filename, input) {
  return new Promise((resolve, reject) => {
    exec(`node "${filename}"`, { timeout: 5000, input }, (error, stdout, stderr) => {
      if (error && error.killed) {
        console.error('JavaScript execution timed out:', error);
        reject(new Error('Execution timed out'));
      } else if (stderr) {
        console.error('JavaScript stderr:', stderr);
        reject(new Error(stderr));
      } else {
        console.log('JavaScript execution stdout:', stdout);
        resolve(stdout);
      }
    });
  });
}


module.exports = router;