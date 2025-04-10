import mongoose from "mongoose";
import { envVar } from "./env.variable.js";
import { logError } from "../utils/index.js";
import logger from "./wins.logger.js";
// This function connects to the MongoDB database using Mongoose.
const connectDB = async () => {
  try {
    await mongoose.connect(envVar.dataBaseUrl);
    logger.infoLogger.info("DataBase connected successfully");
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};

export default connectDB;
