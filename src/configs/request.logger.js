import logger from "./wins.logger.js";
//define morgan format
const morganFormat =
  ":remote-user :remote-addr :method :url :status :http-version :response-time ms";
//define stream option to redirect morgan logs to Logger
const stream = {
  write: (data) => {
    const [ipAddress, method, url] = data.trim().split(" ");
    return logger.httpLogger.info("HTTP Acess Log", {
      ipAddress: ipAddress,
      method: method,
      url: url,
    });
  },
};
export { morganFormat, stream };
