import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "text is required",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "video",
  },
});

const commentModel = mongoose.model("comment", commentSchema);

export default commentModel;
