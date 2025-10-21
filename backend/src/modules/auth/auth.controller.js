import { register, login } from './auth.service.js';

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await register(name, email, password);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

export const getMeController = async (req, res) => {
  res.status(200).json({ success: true, data: { user: req.user } });
};