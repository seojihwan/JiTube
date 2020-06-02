import express from "express";
import routes from "../routes";
import {
  video_detail,
  edit_video,
  delete_video,
  upload,
  postUpload,
  postEditVideo,
} from "../controller/videoController";
import { uploadVideo } from "../middleWares";
const videoRouter = express.Router();

videoRouter.get(routes.upload, upload);
videoRouter.post(routes.upload, uploadVideo, postUpload);
videoRouter.get(routes.edit_video(), edit_video);
videoRouter.post(routes.edit_video(), postEditVideo);
videoRouter.get(routes.delete_video(), delete_video);
videoRouter.get(routes.video_detail(), video_detail);
export default videoRouter;
