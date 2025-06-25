const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/auth');
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create new user
        user = new User({
            name,
            email,
            password,
            role: 'student' // Default role is student
        });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save user to database
        await user.save();

        // Create and return JWT token
        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if admin credentials are used
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Check if admin exists
            let admin = await User.findOne({ email });
            if (!admin) {
                // Create admin user if not found
                admin = new User({
                    name: 'Administrator',
                    email,
                    password,
                    role: 'admin'
                });

                const salt = await bcrypt.genSalt(10);
                admin.password = await bcrypt.hash(password, salt);

                await admin.save();
            }

            // Return JWT token for admin
            const payload = {
                user: {
                    id: admin.id,
                    role: 'admin'
                }
            };

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
                if (err) throw err;
                return res.json({ token, payload });
            });

            return;
        }

        // Regular user login flow
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = {
            user: {
                id: user.id,
                role: user.role
            }
        };

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
            if (err) throw err;
            res.json({ token, payload });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/admin-login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if credentials match hardcoded admin credentials
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ msg: 'Invalid admin credentials' });
        }

        // Check if admin exists in database, if not create one
        let admin = await User.findOne({ email });
        if (!admin) {
            // Create admin user
            admin = new User({
                name: 'Administrator',
                email,
                password,
                role: 'admin'
            });

            // Hash password
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(password, salt);

            // Save admin to database
            await admin.save();
        }

        // Return JWT token
        const payload = {
            user: {
                id: admin.id,
                role: 'admin'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5h' },
            (err, token) => {
                if (err) throw err;
                res.json({ payload, token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/logout', auth, async (req, res) => {
    try {
        // Since JWT is stateless, just inform the client to delete the token
        res.json({ msg: 'Logged out successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;