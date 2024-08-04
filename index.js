import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import rateLimiter from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import xss from 'xss-clean';
import YAML from 'yamljs';

import { protect } from './middlewares/authMiddleware.js';
import {
  errorHandler,
  notFoundHandler,
} from './middlewares/errorMiddlewares.js';

import connectDB from './config/db.js';

import jobsRoutes from './routes/jobsRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express(); // create express app

const swaggerDocument = YAML.load('./swagger.yaml'); // load swagger file

dotenv.config(); // load env variables

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

connectDB(); // connect to database

app.set('trust proxy', 1); // trust first proxy
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
); // limit requests
app.use(express.json()); // parse json body
app.use(helmet()); // set security headers
app.use(cors()); // enable cors
app.use(xss()); // sanitize user input

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} // log requests

app.get('/', (req, res) => {
  res.send('<h1>Jobs API</h1><a href="/api-docs">Documentation</a>');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/jobs', protect, jobsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
