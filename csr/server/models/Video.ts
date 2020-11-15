import { Model, Schema, model, Document } from 'mongoose';
import { CommentDocument } from './Comment';
import { UserDocument } from './User';

export interface IVideo {
  admin: UserDocument;
  title: string;
  description: string;
  filePath: string;
  thumbnailPath: string;
  likePeople: Array<string>;
  comments: Array<CommentDocument>;
  viewcount: number;
  date: string;
}
export interface VideoDocument extends IVideo, Document {}
export interface VideoModel extends Model<VideoDocument> {}
const videoSchema = new Schema<VideoDocument>({
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  filePath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },
  likePeople: [{ type: String }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  viewcount: { type: Number, required: true },
  date: { type: String, required: true },
});

export const Video = model<VideoDocument, VideoModel>('Video', videoSchema);
