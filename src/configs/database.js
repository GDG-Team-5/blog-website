<<<<<<< HEAD
import mongoose from "mongoose";
import { envVar } from "./env.variable.js";

// This function connects to the MongoDB database using Mongoose.
const connectDB = async () => {
  try {
    await mongoose.connect(envVar.dataBaseUrl);
    console.log("DataBase connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
=======
import mongoose from "mongoose";
import { envVar } from "./env.variable.js";

// This function connects to the MongoDB database using Mongoose.
const connectDB = async () => {
  try {
    await mongoose.connect(envVar.dataBaseUrl);
    console.log("DataBase connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
>>>>>>> d7ecc22599000fdc65845647780015dc7cb8f7b8
