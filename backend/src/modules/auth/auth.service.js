import User from '../users/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (name, email, password) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({ name, email, password: hashedPassword });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
  return { token, user: { id: user._id.toString(), email: user.email, name: user.name } };
};

export const login = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return { token, user: { id: user._id.toString(), email: user.email, name: user.name } };
};