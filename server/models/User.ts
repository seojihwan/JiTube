import { model, Model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;
export interface IUser {
  name: string;
  email: string;
  password: string;
  imageUrl: string;
  likeVideos: Array<string>;
  comparePassword(p: string): Promise<boolean>;
}
export interface UserDocument extends IUser, Document {}
export interface UserModel extends Model<UserDocument> {}
const userSchema = new Schema<UserDocument>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: { type: String, required: true },
  likeVideos: [{ type: String }],
});

// 비밀번호 비교 methos 정의
userSchema.methods.comparePassword = async function (plainPW: string) {
  return await bcrypt.compare(plainPW, this.password);
};

//User.save() 이전에 실행됨
userSchema.pre<UserDocument>('save', function (next) {
  const user = this;
  if (this.isModified('password')) {
    // 비밀번호 변경 시에만 암호화, 초기 User 생성 시에도 적용
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else next();
});
export const User = model<UserDocument, UserModel>('User', userSchema);
