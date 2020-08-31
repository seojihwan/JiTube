import {
  model,
  Schema,
  Document,
  PassportLocalModel,
  PassportLocalDocument,
  PassportLocalOptions,
  PassportLocalSchema,
} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const UserSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: String,
  githubId: String,
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Video',
    },
  ],
  videos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}) as PassportLocalSchema;

interface User extends PassportLocalDocument {
  name: string;
  email: string;
  avatarurl: string;
  facebookId: string;
  githubId: string;
}

let options: PassportLocalOptions = <PassportLocalOptions>{};
options.usernameField = 'email';

interface UserModel<T extends Document> extends PassportLocalModel<T> {}

UserSchema.plugin(passportLocalMongoose, options);
const userModel: UserModel<User> = model<User>('User', UserSchema);
export default userModel;
