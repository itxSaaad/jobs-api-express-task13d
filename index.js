import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';

import {
  errorHandler,
  notFoundHandler,
} from './middlewares/errorMiddlewares.js';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import jobsRoutes from './routes/jobsRoutes.js';

const app = express();

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send(
    '<section><h1>Job Board API</h1><p>Welcome to the Job Board API</p><a href="/api/v1/users">Users</a><a href="/api/v1/jobs">Jobs</a></section > '
  );
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/jobs', jobsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
