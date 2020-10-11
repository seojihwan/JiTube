import express, { Request, Response } from 'express';
import { removeToken } from '../auth';
import { User, UserDocument } from '../models';
export const userRouter = express.Router();
userRouter.post('/signup', async (req: Request, res: Response) => {
  const user = new User(req.body);
  console.log(user);
  try {
    await user.save();
    return res.status(200).json({ register: true, user });
  } catch (error) {
    return res.status(400).json({ message: '회원 가입 실패' });
  }
});

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const isSame = await user.comparePassword(req.body.password);
      if (isSame) {
        await user.generateToken(
          (err: string | undefined, user: UserDocument) => {
            res.cookie('user_id', user._id);
            res.cookie('email', user.email);
            res.cookie('token', user.token);
            res.status(200).json({
              user_id: user._id,
              email: user.email,
              token: user.token,
            });
          }
        );
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'login failed' });
  }
});

userRouter.get('/auth', (req: Request, res: Response) => {
  const token = req.cookies.token;
  User.findByToken(token, (err: string, user: UserDocument) => {
    if (err) throw err;
    if (!user)
      return res.status(400).json({ auth: false, message: '인증 실패' });
    res.status(200).json({ user_id: user._id, email: user.email, token });
  });
});

userRouter.get('/logout', removeToken, (req: Request, res: Response) => {
  res.clearCookie('xAuth');
  res.status(200).json({ cookie: false });
});

userRouter.get('/hello', (req: Request, res: Response) => {
  res.send('hello react');
});
