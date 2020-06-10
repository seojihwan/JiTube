import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { Router } from "express";

export const join = (req, res) => res.render("join", { pageTitle: "join" });
export const postJoin = async (req, res, next) => {
  const {
    body: { password, password2, name, email },
  } = req;
  console.log(name);
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
export const logout = (req, res) => {
  res.redirect(routes.home);
};
export const user = (req, res) => res.render("user", { pageTitle: "user" });
export const user_detail = (req, res) =>
  res.render("user_detail", { pageTitle: "user_detail" });
export const edit_profile = (req, res) =>
  res.render("edit_profile", { pageTitle: "edit_profile" });
export const change_password = (req, res) =>
  res.render("change_password", { pageTitle: "change_password" });
