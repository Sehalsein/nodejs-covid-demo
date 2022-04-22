import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { connect } from './db';

import 'dotenv/config';
import './auth/passport';
import authRouter from './routes/auth';
import countriesRouter from './routes/countries';
import loadRouter from './routes/load';
import readRouter from './routes/read';
import userRouter from './routes/user';
import vaccinationRouter from './routes/vaccination';

const app: Express = express();
const port = process.env.PORT || 4000;

connect();

app.use(cors());
app.use(express.json());

app.use('/api/country', countriesRouter);
app.use('/api/vaccination', vaccinationRouter);
app.use('/api/auth', authRouter);
app.use(
  '/api/user',
  passport.authenticate('jwt', { session: false }),
  userRouter,
);

// Dummy Routes
app.use('/read', readRouter);
app.use('/load', loadRouter);

// Error Handler
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  res.statusCode = 500;
  res.json({
    message: 'ERROR',
    error: err.message,
    statusCode: 500,
  });
  next();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
