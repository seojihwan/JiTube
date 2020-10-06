import mongoose from 'mongoose';
const videoSchema = new mongoose.Schema({
  url: {
    type: String,
    required: 'url is required',
  },
  title: {
    type: String,
    required: 'title is required',
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
      ref: 'Video',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

interface VideoProps extends mongoose.Document {
  url: string;
  title: string;
  description: string;
  creator: number;
  // views: number;
  // createdAt: Date;
  // comments: number;
}

const videoModel = mongoose.model<VideoProps>('video', videoSchema);

export default videoModel;
