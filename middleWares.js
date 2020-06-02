import routes from "./routes";
import multer from "multer";
export const locals = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.siteName = "JiTube";
  res.locals.user = {
    isAuthenticated: true,
    id: 11212,
  };
  next();
};

const multerVideo = multer({ dest: "videos/" });
export const uploadVideo = multerVideo.single("videoFile");
