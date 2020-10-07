import { NextFunction, Response, Request } from 'express';
import { IUser, User } from './models';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.xAuth;
  User.findByToken(token, (err: string, user: IUser) => {
    if (err) throw err;
    if (!user) return res.json({ auth: false, message: '인증 실패' });
    next();
  });
};
export const removeToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.xAuth;
  User.findOneAndUpdate({ token }, { token: '' }, (err, user) => {
    if (err) throw err;
    next();
  });
};
