import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { Video } from '../models';
import ffmpeg from 'fluent-ffmpeg';
export const videoRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/uploads/');
    console.log(file);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const fileFilter = (req: Request, file: Express.Multer.File, cb: Function) => {
  const extName = path.extname(file.originalname);
  const videoExtName = ['.mp4', '.avi', '.wmv'];
  if (!videoExtName.includes(extName)) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};
const upload = multer({ storage, fileFilter });
videoRouter.post(
  '/upload',
  upload.single('video'),
  (req: Request, res: Response) => {
    const token = req.cookies.xAuth;
    console.log(req.body);
    console.log(req.file);
    if (!req.file) {
      res.status(400).json({
        upload: 'false',
        message: '비디오 업로드 실패',
      });
    }
    const thumbnailPath = path.basename(
      req.file.filename,
      path.extname(req.file.filename)
    );
    ffmpeg(req.file.path).screenshot({
      count: 1,
      folder: 'server/uploads/thumbnails',
      filename: thumbnailPath,
    });
    const video = new Video({
      ...req.body,
      admin: req.body.user_id,
      filePath: req.file.path,
      thumbnailPath: 'server/uploads/thumbnails/' + thumbnailPath + '.png',
    });
    console.log(video);
    video.save();
    res.status(200).json({ upload: 'true', '비디오 이름': req.file.filename });
  }
);
videoRouter.post(
  '/thumbnail',
  upload.single('video'),
  (req: Request, res: Response) => {
    const token = req.cookies.xAuth;
    console.log(req.body);
    console.log(req.file);
    if (!req.file) {
      res.status(400).json({
        upload: 'false',
        message: '비디오 업로드 실패',
      });
    }
    res.status(200).json({ upload: 'true', '비디오 이름': req.file.filename });
  }
);

videoRouter.get('/getall', (req: Request, res: Response) => {
  Video.find()
    .populate('admin')
    .exec((err, videos) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(videos);
    });
});
