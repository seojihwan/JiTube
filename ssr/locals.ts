import routes from "./routes";

export default (req, res, next) => {
  res.locals.routes = routes;
  res.locals.siteName = "JiTube";

  next();
};
