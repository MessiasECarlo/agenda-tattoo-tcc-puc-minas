import 'reflect-metadata';

import 'dotenv/config';
import 'express-async-errors';

import '@shared/container';
import '@shared/infra/typeorm';

import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import uploadConfig from '@config/upload';

import AppError from '@shared/errors/AppError';
import rateLimiter from '@shared/infra/http/middlewares/rateLimiter';
import routes from '@shared/infra/http/routes';
import fakeRoutes from '@shared/infra/http/routes/fake.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);
app.use(fakeRoutes);
app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError)
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error!'
  });
});

const port = process.env.PORT || 3333;

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}!`);
});
