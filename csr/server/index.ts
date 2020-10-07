import express, { Request, Response } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { IUser, User, UserDocument } from './models';
import { auth } from './auth';
const app = express();
const port = process.env.port || 4000;

//application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//application/json
app.use(express.json());
app.use(cookieParser());
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
  user.save((err, user) => {
    if (err) return res.status(400).json({ register: false, err });
    return res.status(200).json({ register: true, user });
  });
});

app.post('/login', (req: Request, res: Response) => {
  User.findOne({ email: req.body.email }, (err: string | undefined, user: IUser | undefined) => {
    if (!user) {
      return res.json({
        login: false,
        message: '등록되지 않은 이메일입니다.',
      });
    }
    user.comparePassword(req.body.password, (err: string | undefined, isEqual: boolean) => {
      if (!isEqual) return res.status(400).json({ login: false, message: '비밀번호가 틀렸습니다' });

      user.generateToken((err: string | undefined, user: IUser) => {
        if (err) return res.status(400).send(err);

        res.cookie('xAuth', user.token).status(200).json({ login: true });
      });
    });
  });
});

app.get('/auth', auth, (req: Request, res: Response) => {
  res.status(200).json({ auth: true });
});
