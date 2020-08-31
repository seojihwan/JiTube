import routes from "./routes";
import multer from "multer";
export const locals = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.siteName = "JiTube";
  res.locals.loggedUser = req.user || null;
  next();
};
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
const multerVideo = multer({ dest: "videos/" });
const multerAvatar = multer({ dest: "avatars/" });
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
