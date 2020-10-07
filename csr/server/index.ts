import express, { Request, Response } from 'express';
import morgan from 'morgan';
const app = express();
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models';
const port = process.env.port || 4000;

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//application/json
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req: Request, res: Response) => res.send('hello express'));
app.listen(port, () => console.log('listening on port', port));

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

app.post('/register', (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true, userInfo });
  });
});
