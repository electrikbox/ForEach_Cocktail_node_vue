import { db } from './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/users.js';
import cocktailRouter from './routes/cocktails.js';
import tokenAuth from './middlewares/tokenAuth.js';


// Load environment variables
dotenv.config();


// Create express app
const app = express();

// Test database connection
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('Connected to database');
    connection.release();
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

// Middleware
app.use(express.json());
app.use(cors());


// Routes
app.use("/users", userRouter);
app.use("/cocktails", tokenAuth, cocktailRouter);


// Start server
app.listen(process.env.PORT, () => {
  console.log(`listening at http://localhost:${process.env.PORT}`);
});