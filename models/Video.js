import mongoose from "mongoose";
const videoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: "url is required",
  },
  title: {
    type: String,
    required: "title is required",
  },
  description: String,
  views: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const videoModel = mongoose.model("video", videoSchema);

export default videoModel;
