import express, { Request, Response } from 'express';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
const port = process.env.port || 4000;
app.get('/', (req: Request, res: Response) => res.send('hello express'));
app.listen(port, () => console.log('listening on port', port));
const a = 1;

dotenv.config();
mongoose
  .connect(process.env.mongoURI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => console.log('connected to mongoDB'))
  .catch((error) => console.log(error));
