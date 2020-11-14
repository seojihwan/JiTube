import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { User, Video, Comment } from '../models';
import ffmpeg from 'fluent-ffmpeg';
import { Types } from 'mongoose';
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
  const videoExtName = ['.mp4', '.wmv'];
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
  async (req: Request, res: Response) => {
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
      filePath: '/' + req.file.filename,
      thumbnailPath: '/thumbnails/' + thumbnailPath + '.png',
    });

    try {
      await video.save();
      res.status(200).json({ requestUpload: true });
    } catch (error) {
      console.log(error);
      res.status(400).json({ requestUpload: false });
    }
  }
);

videoRouter.get('/getall', async (req: Request, res: Response) => {
  try {
    const videos = await Video.find()
      .populate('admin')
      .populate({ path: 'comments', populate: { path: 'admin' } })
      .populate({
        path: 'comments',
        populate: { path: 'replyComments', populate: { path: 'admin' } },
      })
      .exec();
    res.status(200).json({ videos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ requestGetAll: false });
  }
});

videoRouter.post('/getone', async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const video = await Video.findById(req.body.video_id)
      .populate('admin')
      .populate({ path: 'comments', populate: { path: 'admin' } })
      .populate({
        path: 'comments',
        populate: { path: 'replyComments', populate: { path: 'admin' } },
      })
      .exec();
    res.status(200).json({ video });
  } catch (error) {
    console.log(error);
    res.status(400).json({ requestGetOne: false });
  }
});

videoRouter.post('/like', async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    if (req.body.like) {
      await Video.findByIdAndUpdate(
        req.body.video_id,
        { $push: { likePeople: req.body.user_id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.body.user_id,
        { $push: { likeVideos: req.body.video_id } },
        { new: true }
      );
    } else {
      await Video.findByIdAndUpdate(
        req.body.video_id,
        { $pull: { likePeople: req.body.user_id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.body.user_id,
        { $pull: { likeVideos: req.body.video_id } },
        { new: true }
      );
    }
    res.status(200).json({ requestLike: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ requestLike: false });
  }
});

videoRouter.post('/comment', async (req: Request, res: Response) => {
  console.log(req.body);
  const { user_id, contents, video_id, comment_id } = req.body;
  const comment = new Comment({ admin: user_id, contents });
  try {
    await comment.save();
    if (!comment_id) {
      await Video.findByIdAndUpdate(
        video_id,
        { $push: { comments: comment } },
        { new: true }
      );
    } else {
      await Comment.findByIdAndUpdate(
        comment_id,
        {
          $push: { replyComments: comment },
        },
        { new: true }
      );
    }
    res.status(200).json({ comment: true });
  } catch (error) {
    res.status(400).json({ message: '코멘트 등록 실패' });
  }
});

videoRouter.post('/delete', async (req: Request, res: Response) => {
  const { video_id } = req.body;
  console.log(video_id);
  try {
    await Video.findByIdAndDelete(video_id).exec();
    res.status(200).json({ delete: true });
  } catch (error) {
    res.status(400).json({ message: '비디오 삭제 실패' });
  }
});

videoRouter.post('/deletecomment', async (req: Request, res: Response) => {
  const { video_id, comment_id, parrentComment_id } = req.body;
  try {
    await Comment.findByIdAndDelete(comment_id).exec();
    res.status(200).json({ deletecomment: true });
    if (!parrentComment_id) {
      await Video.findByIdAndUpdate(
        video_id,
        { $pull: { comments: comment_id } },
        { new: true }
      );
    } else {
      await Comment.findByIdAndUpdate(
        comment_id,
        {
          $pull: { replyComments: comment_id },
        },
        { new: true }
      );
    }
  } catch (error) {
    res.status(400).json({ message: '코멘트 삭제 실패' });
  }
});
