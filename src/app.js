// src/app.ts
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import connectDB from './config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

export default app;
