import routes from "../routes";
import videoModel from "../models/Video";
export const home = async (req, res) => {
  console.log("hello");
  try {
    const videos = await videoModel.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "home", videos: [] });
  }
  console.log("hello");
};

export const search = async (req, res) => {
  const {
    query: { title },
  } = req;
  let videos = [];
  try {
    videos = await videoModel.find({
      title: { $regex: title, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "search", title, videos });
};

export const upload = (req, res) =>
  res.render("upload", { pageTitle: "upload" });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path: url },
  } = req;
  try {
    const newVideo = await videoModel.create({ url, title, description });
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
    const video = await videoModel.findById(id);
    console.log(video);
    res.render("video_detail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const edit_video = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await videoModel.findById(id);
    console.log(video);
    res.render("edit_video", { pageTitle: `Edit ${video.title}`, video });
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
    await videoModel.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
