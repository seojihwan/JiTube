import routes from "./routes";
import multer from "multer";
export const locals = (req, res, next) => {
  res.locals.routes = routes;
  res.locals.siteName = "JiTube";
  console.log(req.user);
  res.locals.user = req.user || null;
  next();
};

const multerVideo = multer({ dest: "videos/" });
export const uploadVideo = multerVideo.single("videoFile");
