import mongoose, { Model, Schema, model, Document } from 'mongoose';

export interface IVideo {
  admin: Schema.Types.ObjectId;
  title: string;
  description: string;
  filePath: string;
  thumbnailPath: string;
}
export interface VideoDocument extends IVideo, Document {}
export interface VideoModel extends Model<VideoDocument> {}
const videoSchema = new Schema<VideoDocument>({
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  filePath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },
});

export const Video = model<VideoDocument, VideoModel>('Video', videoSchema);
