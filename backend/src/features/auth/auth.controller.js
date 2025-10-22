import { register, login } from './auth.service.js';

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const result = await register(name, email, password);
    res.status(201).json({ success: true, data: result, message: 'User registered successfully' });
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json({ success: true, data: result, message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

export const getMeController = async (req, res) => {
  // The user object is attached by the 'protect' middleware
  res.status(200).json({ success: true, data: { user: req.user } });
};