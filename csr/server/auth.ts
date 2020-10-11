import { NextFunction, Response, Request } from 'express';
import {  User } from './models';


export const removeToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.xAuth;
  User.findOneAndUpdate({ token }, { token: '' }, (err, user) => {
    if (err) throw err;
    next();
  });
};
