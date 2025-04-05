import connectDB from "./configs/database.js";
import { envVar } from "./configs/env.variable.js";
import app from "./app.js";

const sever = app.listen(envVar.port, async () => {
  console.log(`Server is running on port ${envVar.port}`);
  console.log(`http://localhost:${envVar.port}`);
  await connectDB();
});

// This function Handle uncaught exceptions and unhandled rejections
const handleUncaughtException = (error) => {
  console.log(error.stack);
  handleExit(sever);
};

//This function shuts down the server gracefully
const handleExit = (server) => {
  if (sever) {
    sever.close(() => {
      console.log("Server is shutting down");
      process.exit(0);
    });
  } else {
    process.exit(1);
  }
};

process.on("uncaughtException", handleUncaughtException);
process.on("unhandledRejection", handleUncaughtException);
process.on("SIGTERM", (sig) => {
  console.log(sig);
  if (sever) {
    sever.close();
  }
});
