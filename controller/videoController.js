import routes from "../routes";
import { videos } from "../data"
export const video = (req, res) => res.render("video", { pageTitle: "videos" });
export const search = (req, res) => {
  const { query: { title } } = req
  res.render("search", { pageTitle: "search", title, videos });
}
export const upload = (req, res) => res.render("upload", { pageTitle: "upload" });
export const postUpload = (req, res) => {
  const {
    body: { file, title, description }
  } = req
  res.redirect(routes.video_detail(123123));
}
export const video_detail = (req, res) => res.render("video_detail", { pageTitle: "video_detail" });
export const edit_video = (req, res) => res.render("edit_video", { pageTitle: "edit_video" });
export const delete_video = (req, res) => res.render("delete_video", { pageTitle: "delete_video" });
