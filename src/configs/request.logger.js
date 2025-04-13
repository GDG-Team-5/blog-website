import logger from "./wins.logger.js";
//define morgan format
const morganFormat =
  ":remote-user :remote-addr :method :url :status :http-version :response-time ms";
//define stream option to redirect morgan logs to Logger
const stream = {
  write: (data) => {
    const [
      userName,
      ipAddress,
      method,
      url,
      status,
      httpVersion,
      responseTime,
    ] = data.trim().split(" ");
    return logger.httpLogger.info("HTTP Acess Log", {
      userName: userName === "-" ? "anonymous" : userName,
      ipAddress: ipAddress,
      method: method,
      url: url,
      status: Number(status),
    });
  },
};
export { morganFormat, stream };
