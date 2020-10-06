import passport from 'passport';
import GithubStrategy from 'passport-github';
import facebook from 'passport-facebook';
import User from './models/User';
import { githubLoginCallback, facebookLoginCallback } from './controller/userController';
import routes from './routes';

passport.use(User.createStrategy());
passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:3000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);
passport.use(
  new facebook.Strategy(
    {
      clientID: process.env.FB_ID,
      clientSecret: process.env.FB_SECRET,
      callbackURL: `http://localhost:3000${routes.facebookCallback}`,
    },
    facebookLoginCallback
  )
);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
