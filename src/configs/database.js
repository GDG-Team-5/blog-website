import mongoose from "mongoose";
import { envVar } from "./env.variable.js";

const connectDB = async () => {
  try {
    await mongoose.connect(envVar.dataBaseUrl);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
