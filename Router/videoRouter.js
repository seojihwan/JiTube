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
import { uploadVideo, onlyPrivate } from "../middleWares";
const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, upload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);
videoRouter.get(routes.edit_video(), onlyPrivate, edit_video);
videoRouter.post(routes.edit_video(), onlyPrivate, postEditVideo);
videoRouter.get(routes.delete_video(), onlyPrivate, delete_video);
videoRouter.get(routes.video_detail(), video_detail);
export default videoRouter;
