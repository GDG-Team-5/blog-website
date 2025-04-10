import connectDB from "./configs/database.js";
import { envVar } from "./configs/env.variable.js";
import { logError } from "./utils/index.js";
import logger from "./configs/wins.logger.js";
import app from "./app.js";

const sever = app.listen(envVar.port, async () => {
  logger.infoLogger.info(`Server is running at port ${envVar.port}`);
  logger.infoLogger.info(`http://localhost:${envVar.port}`);
  await connectDB();
});

// This function Handle uncaught exceptions and unhandled rejections
const handleUncaughtException = (error) => {
  logError(error);
  handleExit(sever);
};

//This function shuts down the server gracefully
const handleExit = (server) => {
  if (sever) {
    sever.close(() => {
      logger.infoLogger.warn("Server is shutting down");
      process.exit(0);
    });
  } else {
    process.exit(1);
  }
};

process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUncaughtException);
process.on("SIGTERM", (sig) => {
  logger.infoLogger.info(sig);
  if (sever) {
    sever.close();
  }
});
