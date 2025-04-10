import { format, transports, createLogger, addColors } from "winston";
const { combine, timestamp, json, simple, colorize } = format;
import { envVar } from "./env.variable.js";

addColors({
  error: "red bold",
  warn: "yellow bold",
  info: "cyan bold",
  http: "magenta bold",
  debug: "blue bold",
});

// file transoport for http logs
const httpFile = new transports.File({
  level: "info",
  filename: `${envVar.fileLogPath}/httpLogs.log`,
  json: true,
});
// file transoport for error logs
const errFile = new transports.File({
  filename: `${envVar.fileLogPath}/errorLogs.log`,
  level: "error",
});
//file transport for sent  email logs
const emailFile = new transports.File({
  filename: `${envVar.fileLogPath}/emailSent.log`,
  level: "info",
});
// console transport
const consoleTransport = new transports.Console({
  format: combine(colorize({ all: true }), simple()),
});
//create http logger
const httpLogger = createLogger({
  level: envVar.env === "production" ? "info" : "debug",
  format: json(),
  transports: [httpFile, consoleTransport],
});
//create error logger
const errorLogger = createLogger({
  level: "error",
  format: combine(json(), timestamp()),
  transports: [errFile, consoleTransport],
});
//create email sent logger
const emailLogger = createLogger({
  level: "info",
  format: combine(json(), timestamp()),
  transports: [emailFile, consoleTransport],
});
const infoLogger = createLogger({
  level: "info",
  format: combine(colorize({ all: true })),
  transports: [consoleTransport],
});
// remove console transport if it is in production stage
if (envVar.env === "production") {
  httpLogger.remove(consoleTransport);
  errorLogger.remove(consoleTransport);
  emailLogger.remove(consoleTransport);
}
export default { httpLogger, errorLogger, emailLogger, infoLogger };
