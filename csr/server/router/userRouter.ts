import express, { Request, Response } from 'express';
import { removeToken } from '../auth';
import { User, UserDocument } from '../models';
export const userRouter = express.Router();
userRouter.post('/signup', async (req: Request, res: Response) => {
  const user = new User(req.body);
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
            res.cookie('token', user.token, { httpOnly: true });
            res.status(200).json({
              user_id: user._id,
              email: user.email,
              token: user.token,
              name: user.name,
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

userRouter.get('/auth', async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(200).json({ auth: false, message: '인증 실패' });
  try {
    await User.findByToken(token, async (err: string, user: UserDocument) => {
      if (err) throw err;
      if (!user)
        return res.status(400).json({ auth: false, message: '인증 실패' });
      console.log(user);
      res
        .status(200)
        .json({ user_id: user._id, email: user.email, token, name: user.name });
    });
  } catch (error) {
    return res.status(400).json({ auth: false, message: '인증 실패' });
  }
});

userRouter.get('/logout', removeToken, (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).json({ cookie: false });
});

userRouter.get('/hello', (req: Request, res: Response) => {
  res.send('hello react');
});
