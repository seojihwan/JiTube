import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;
export interface IUser {
  name: string;
  email: string;
  password: string;
}
export interface UserDocument extends IUser, mongoose.Document {}
const userSchema = new mongoose.Schema<IUser>({
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
    minlength: 6,
    maxlength: 16,
    required: true,
  },
  imageUrl: String,
});

const a: IUser = {
  name: 'string',
  email: 'string',
  password: 'string',
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
export const User = mongoose.model('User', userSchema);
