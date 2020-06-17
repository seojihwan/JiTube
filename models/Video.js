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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const videoModel = mongoose.model("video", videoSchema);

export default videoModel;
