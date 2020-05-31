import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import routes from "./routes"
import globalRouter from "./Router/globalRouter"
import userRouter from "./Router/userRouter"
import videoRouter from "./Router/videoRouter"
import locals from "./locals"
const app = express()
app.use(helmet())
app.set("view engine", "pug")
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(locals)
app.use(routes.home, globalRouter);
app.use(routes.video, videoRouter);
app.use(routes.user, userRouter);


export default app