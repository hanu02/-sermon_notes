// line 1: import jsonwebtoken
const jwt = require('jsonwebtoken');
// line 2: import your User model
const User = require('../models/User');
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 1. your line: req.user = await User.findById(...).select(...)
      req.user =await User.findById(decoded.id).select('-password');
      // 2. your line: next()
      next();
    } catch (error) {
      // 3. your line: send status 401 with a message
      res.status(401).json({message: "not authorized token"});
    }
  } else {
    // 4. your line: send status 401 with a "no token" message
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// 5. your line: module.exports
module.exports = {protect}