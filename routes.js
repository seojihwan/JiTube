const home = "/";
const join = "/join";
const login = "/login";
const logout = "/logout";
const search = "/search";

const user = "/user";
const edit_profile = "/edit-profile";
const user_detail = "/:id";
const change_password = "/change-password";
const me = "/me";

const video = "/videos";
const upload = "/upload";
const video_detail = "/:id";
const edit_video = "/:id/edit";
const delete_video = "/:id/delete";

const github = "/auth/github";
const githubCallback = "/auth/github/callback";
const facebook = "/auth/facebook";
const facebookCallback = "/auth/facebook/callback";
const routes = {
  home,
  join,
  login,
  logout,
  search,
  user,
  user_detail: (id) => {
    if (id) {
      return `${user}/${id}`;
    } else {
      return user_detail;
    }
  },
  edit_profile,
  change_password,
  video,
  upload,
  video_detail: (id) => {
    if (id) {
      return `${video}/${id}`;
    } else {
      return video_detail;
    }
  },
  edit_video: (id) => {
    if (id) {
      return `/videos/${id}/edit`;
    } else {
      return edit_video;
    }
  },
  delete_video: (id) => {
    if (id) {
      return `/videos/${id}/delete`;
    } else {
      return delete_video;
    }
  },
  github,
  githubCallback,
  facebook,
  facebookCallback,
  me,
};

export default routes;
