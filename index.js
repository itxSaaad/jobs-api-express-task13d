import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';

import {
  errorHandler,
  notFoundHandler,
} from './middlewares/errorMiddlewares.js';

const app = express();

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

app.use(express.json());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('API is running....');
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});
