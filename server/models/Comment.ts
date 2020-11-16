import { model, Model, Schema, Document } from 'mongoose';
import { UserDocument } from './User';

export interface IComment {
  admin: UserDocument;
  contents: string;
  replyComments: Array<CommentDocument>;
}

export interface CommentDocument extends IComment, Document {}
export interface CommentModel extends Model<CommentDocument> {}
const commentSchema = new Schema<CommentDocument>({
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  contents: { type: String, required: true },
  replyComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export const Comment = model<CommentDocument, CommentModel>(
  'Comment',
  commentSchema
);
