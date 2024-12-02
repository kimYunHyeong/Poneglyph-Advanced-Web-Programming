import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: { type: String, required: true, unique: true },
  socialOnly: { type: Boolean, default: false },
  avatarUrl: { type: String },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  nickName: { type: String },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
});

const User = mongoose.model("User", userSchema);
export default User;
