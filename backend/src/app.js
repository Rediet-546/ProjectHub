import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectDB } from './config/database.js';
import authRoutes from './models/auth/auth.routes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  }
});

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => res.status(200).send('OK'));
app.use('/api/auth', authRoutes);

app.use(errorHandler);

export { app, io };