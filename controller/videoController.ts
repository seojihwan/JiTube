import routes from '../routes';
import videoModel from '../models/Video';
export const home = async (req, res) => {
  try {
    const videos = await videoModel.find({}).sort({ _id: -1 });
    res.render('home', { pageTitle: 'home', videos });
  } catch (error) {
    console.log(error);
    res.render('home', { pageTitle: 'home', videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { title },
  } = req;
  let videos = [];
  try {
    videos = await videoModel.find({
      title: { $regex: title, $options: 'i' },
    });
  } catch (error) {
    console.log(error);
  }
  res.render('search', { pageTitle: 'search', title, videos });
};

export const upload = (req, res) => res.render('upload', { pageTitle: 'upload' });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path: url },
  }: { body: { title: string; description: string }; file: { path: string } } = req;
  console.log(url);
  try {
    const newVideo = await videoModel.create({
      url,
      title,
      description,
      creator: req.user.id,
    });
    req.user.videos.push(newVideo.id);
    req.user.save();
    res.redirect(routes.video_detail(newVideo._id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const video_detail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await videoModel.findById(id).populate('creator');
    res.render('video_detail', { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const edit_video = async (req, res) => {
  const {
    params: { id },
  } = req;
  // router를 보호하기 위해서, 비디오의 creator와 loggedUser(접속된 유저로 쿠키에 저장된 값을 통해 식별)의 id가 다르면 Error를 발생시킴
  try {
    const video = await videoModel.findById(id);
    if (String(video.creator) !== req.user.id) {
      console.log('?');
      throw Error();
    } else {
      res.render('edit_video', { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;

  try {
    await videoModel.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.video_detail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const delete_video = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await videoModel.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await videoModel.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
