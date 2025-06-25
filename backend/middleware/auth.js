const jwt = require('jsonwebtoken');

// Middleware to verify JWT token
const auth = (req, res, next) => {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware to check if user is admin
const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied. Admin privileges required' });
    }
    next();
  });
};

// Middleware to check if user is a student
const studentAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'student') {
      return res.status(403).json({ msg: 'Access denied. Student privileges required' });
    }
    next();
  });
};

module.exports = { auth, adminAuth, studentAuth };