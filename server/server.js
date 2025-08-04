// server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON
app.use(express.urlencoded({ extended: true }));

//  Connections
connectDB();
 
// Routes placeholder
app.get('/', (req, res) => {
  res.send('FileFleet Server is running...');
});

app.use('/api/user',authRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
