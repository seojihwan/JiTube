import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import globalRouter from './Router/globalRouter';
import userRouter from './Router/userRouter';
import videoRouter from './Router/videoRouter';
import { locals } from './middleWares';
import passport from 'passport';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import './passport';
import mongoose from 'mongoose';

const app = express();
const CookieStore = MongoStore(session);
app.use(helmet());
app.set('view engine', 'pug');
app.use('/videos', express.static('videos'));
app.use('/avatars', express.static('avatars'));
app.use('/static', express.static('static'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
console.log(process.env.COOKIE_SECRET);
app.use(
  session({
    secret: process.env.COOKIE_SECRET!, //nullable
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(locals);
app.use(routes.home, globalRouter);
app.use(routes.video, videoRouter);
app.use(routes.user, userRouter);

export default app;
