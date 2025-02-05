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


// Connect to database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});


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