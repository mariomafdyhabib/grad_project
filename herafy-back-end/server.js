import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './src/db/connect.js';
import userRouter from './src/routes/user-routes.js';
import jobRouter from './src/routes/job-routes.js';

dotenv.config();

const app = express();

// middlewares
app.use(
  cors({
    origin: '*',
    allowedHeaders: '*',
    exposedHeaders: ['x-auth-token'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/users', userRouter);
app.use('/api/jobs', jobRouter);
// db connection
await connectDB();

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
