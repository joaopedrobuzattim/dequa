import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express, { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import cors from 'cors';
import routes from './routes';

import '@shared/infra/Typeorm';
import '@shared/container';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Running');
});
