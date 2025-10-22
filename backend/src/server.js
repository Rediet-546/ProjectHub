// backend/src/server.js

import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './features/auth/auth.routes.js';
import projectRoutes from './features/projects/project.routes.js'; 
import { errorHandler } from './features/auth/auth.middleware.js'; // <-- This import is now correct

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running...' });
});

// Use the global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));