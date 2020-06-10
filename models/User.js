import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: String,
  githubId: String,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });
const userModel = mongoose.model("User", UserSchema);
export default userModel;
