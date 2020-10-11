import express, { Request, Response } from 'express';
import { removeToken } from '../auth';
import { User, UserDocument } from '../models';
export const userRouter = express.Router();
userRouter.post('/signup', (req: Request, res: Response) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(400).json({ register: false, err });
    return res.status(200).json({ register: true, user });
  });
});

userRouter.post('/login', (req: Request, res: Response) => {
  User.findOne(
    { email: req.body.email },
    (err: string | undefined, user: UserDocument | undefined) => {
      if (!user) {
        return res.status(400).json({
          login: false,
          message: '등록되지 않은 이메일입니다.',
        });
      }
      user.comparePassword(
        req.body.password,
        (err: string | undefined, isEqual: boolean) => {
          if (!isEqual)
            return res
              .status(400)
              .json({ login: false, message: '비밀번호가 틀렸습니다' });

          user.generateToken((err: string | undefined, user: UserDocument) => {
            if (err) return res.status(400).send(err);
            res.cookie('xAuth', user.token).status(200).json({ user_id: user._id, email: user.email, token: user.token });
          });
        }
      );
    }
  );
});

userRouter.get('/auth', (req: Request, res: Response) => {
  const token = req.cookies.xAuth;
  User.findByToken(token, (err: string, user: UserDocument) => {
    if (err) throw err;
    if (!user) return res.status(400).json({ auth: false, message: '인증 실패' });
    res.status(200).json({ user_id: user._id, email: user.email, token })
  });
});

userRouter.get('/logout', removeToken, (req: Request, res: Response) => {
  res.clearCookie('xAuth');
  res.status(200).json({ cookie: false });
});

userRouter.get('/hello', (req: Request, res: Response) => {
  res.send('hello react');
});
