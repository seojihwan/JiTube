import routes from "./routes"

export default (req, res, next) => {
  res.locals.routes = routes
  res.locals.siteName = "JiTube"
  res.locals.user = {
    isAuthenticated: true,
    id: 11212
  };
  next()
} 