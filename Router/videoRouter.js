import express from "express";
import routes from "../routes";
import {
  video,
  upload,
  video_detail,
  edit_video,
  delete_video,
} from "../controller/videoController";
const videoRouter = express.Router();

videoRouter.get(routes.home, video);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.video_detail, video_detail);
videoRouter.get(routes.edit_video, edit_video);
videoRouter.get(routes.delete_video, delete_video);
export default videoRouter;
