import { videos } from "../data"
import routes from "../routes";

export const home = (req, res) => res.render("home", { pageTitle: "Home", videos });
export const join = (req, res) => res.render("join", { pageTitle: "join" });
export const postJoin = (req, res) => {
  const { body: { id, password, password2, name, email } } = req
  console.log(name)
  if (password !== password2) {
    res.status(400)
    res.render("join", { pageTitle: "join" })
  } else {
    res.redirect(routes.home)

  }
};
export const login = (req, res) => res.render("login", { pageTitle: "login" });
export const postLogin = (req, res) => {
  res.redirect(routes.home);
}
export const logout = (req, res) => {
  res.redirect(routes.home)
};
export const user = (req, res) => res.render("user", { pageTitle: "user" });
export const user_detail = (req, res) => res.render("user_detail", { pageTitle: "user_detail" });
export const edit_profile = (req, res) => res.render("edit_profile", { pageTitle: "edit_profile" });
export const change_password = (req, res) => res.render("change_password", { pageTitle: "change_password" });
