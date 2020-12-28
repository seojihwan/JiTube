import express, { Request, Response } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRouter, videoRouter } from './router/';
dotenv.config();
const app = express();
// const port = process.env.port || 4000;
const port = 4000;
//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//application/json
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.listen(port, () => console.log('listening on port', port));

app.use(express.static('server/uploads'));
app.use(express.static('server/avatars'));

app.get('/', (req: Request, res: Response) => res.send('hello express'));

mongoose
  .connect(process.env.mongoURI as string, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to mongoDB'))
  .catch(error => console.log(error));

app.use('/user', userRouter);
app.use('/video', videoRouter);
