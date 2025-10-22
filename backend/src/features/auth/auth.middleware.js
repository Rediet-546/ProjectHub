// backend/src/features/auth/auth.middleware.js

import jwt from 'jsonwebtoken';
import User from '../../models/user.js';

// Middleware to protect routes - verifies JWT
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
    }
    req.user = { id: user._id.toString(), email: user.email, name: user.name };
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
  }
};

// Global Error Handler Middleware
// --- FIX: Ensure this function exists and is exported ---
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    err = { message, statusCode: 404 };
  }
  
  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    err = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    err = { message, statusCode: 400 };
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Server Error',
  });
};