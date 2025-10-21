// src/server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example API route
app.get('/api/products', (req, res) => {
  res.json([{ id: 1, name: 'Sample Product' }]);
});

// Catch-all for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
