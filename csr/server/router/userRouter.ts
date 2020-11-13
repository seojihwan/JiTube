import express, { Request, Response } from 'express';
import { User, UserDocument, Video } from '../models';
import jwt from 'jsonwebtoken';
export const userRouter = express.Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
  const user = new User({
    ...req.body,
    imageUrl: `/${Math.floor(Math.random() * 5 + 1)}.png`,
  });
  try {
    await user.save();
    res.status(200).json({ register: true, user });
  } catch (error) {
    res.status(400).json({ message: '회원 가입 실패' });
  }
});

userRouter.post('/login', async (req: Request, res: Response) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const isSame = await user.comparePassword(req.body.password);
      if (isSame) {
        const token = jwt.sign(
          user._id.toHexString(),
          process.env.jwtSecret || ''
        );
        res.cookie('email', user.email, { httpOnly: true });
        res.cookie('name', user.name, { httpOnly: true });
        res.cookie('imageUrl', user.imageUrl, { httpOnly: true });
        res.cookie('user_id', user._id, { httpOnly: true });
        res.cookie('token', token, { httpOnly: true });
        return res.status(200).json({
          user_id: user._id,
          email: user.email,
          name: user.name,
          imageUrl: user.imageUrl,
          token,
        });
      }
      res.status(400).json({ message: 'password incorrect' });
    }
    res.status(400).json({ message: 'not registerd' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'login failed' });
  }
});

userRouter.get('/auth', async (req: Request, res: Response) => {
  const { user_id, email, token, name, imageUrl } = req.cookies;
  if (token) {
    try {
      if (jwt.verify(token, process.env.jwtSecret || '')) {
        console.log(token);
        return res.status(200).json({
          user_id: decodeURIComponent(user_id),
          email: decodeURIComponent(email),
          name: decodeURIComponent(name),
          imageUrl: decodeURIComponent(imageUrl),
          token,
        });
      }
      return res.status(400).json({ auth: false, message: '인증 오류' });
    } catch (error) {
      return res.status(400).json({ auth: false, message: '토큰 오류' });
    }
  }
  res.status(400).json({ auth: false, message: '인증 실패' });
});

userRouter.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('token');
  res.clearCookie('email');
  res.clearCookie('name');
  res.clearCookie('user_id');
  res.status(200).json({ cookie: false });
});

userRouter.post('/getallvideos', async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const video = await Video.find({ admin: req.body.user_id })
      .populate('admin')
      .populate({ path: 'comments', populate: { path: 'admin' } })
      .exec();
    res.status(200).json({ video });
  } catch (error) {
    console.log(error);
    res.status(400).json({ getUserVideo: false });
  }
});

userRouter.get('/hello', (req: Request, res: Response) => {
  res.send('hello react');
});
