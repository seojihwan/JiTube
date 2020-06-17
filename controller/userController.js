import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { Router } from "express";
import { mongo } from "mongoose";

export const join = (req, res) => res.render("join", { pageTitle: "join" });
export const postJoin = async (req, res, next) => {
  const {
    body: { password, password2, name, email },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "join" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const login = (req, res) => res.render("login", { pageTitle: "login" });
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const githubLogin = passport.authenticate("github");
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      await user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      avatarUrl,
      githubId: id,
    });
    return cb(null, newUser);
  } catch (err) {
    return cb(err);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = (
  accessToken,
  refreshToken,
  profile,
  done
) => {
  console.log(accessToken, refreshToken, profile, done);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("user_detail", { pageTitle: "user_detail", user: req.user });
};
export const user = (req, res) => res.render("user", { pageTitle: "user" });
export const user_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id);
    res.render("user_detail", { pageTitle: "user_detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const editProfile = (req, res) =>
  res.render("edit_profile", { pageTitle: "edit_profile" });
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    console.log(file);
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.edit_profile);
  }
};
export const getChangePassword = async (req, res) => {
  res.render("change_password", { pageTitle: "change_password" });
};

export const postChangePassword = async (req, res) => {
  const {
    body: { password, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`${routes.user}${routes.change_password}`);
    }
    await req.user.changePassword(password, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`${routes.user}${routes.change_password}`);
  }
};
