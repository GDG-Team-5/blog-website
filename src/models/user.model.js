import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { format, isEmailUsed, verifyPassword } from "./plugin.js";
//user  schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

// Middleware to hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
//add plugins
userSchema.plugin(format, "toJSON");
userSchema.plugin(format, "toObject");
userSchema.plugin(isEmailUsed);
userSchema.plugin(verifyPassword);

const User = mongoose.model("User", userSchema);
export default User;
