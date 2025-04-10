import mongoose from "mongoose";
import { envVar } from "./env.variable.js";
import { logError } from "../utils/index.js";
import logger from "./wins.logger.js";
// This function connects to the MongoDB database using Mongoose.
const connectDB = async () => {
  try {
    const db = await mongoose.connect(envVar.dataBaseUrl);
    logger.infoLogger.info(
      `MONGODB DataBase connected successfully at => ${db.connection.host}`
    );
  } catch (error) {
    logError(error);
    process.exit(1);
  }
};

export default connectDB;
