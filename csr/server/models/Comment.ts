import { model, Model, Schema, Document } from 'mongoose';

export interface IComment {
  username: string;
  contents: string;
  replyComments: Array<IComment>;
}

export interface CommentDocument extends IComment, Document {}
export interface CommentModel extends Model<CommentDocument> {}
const commentSchema = new Schema<CommentDocument>({
  username: { type: String, required: true },
  contents: { type: String, required: true },
  replyComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

export const Comment = model<CommentDocument, CommentModel>(
  'Comment',
  commentSchema
);
