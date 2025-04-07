import nodemailer from "nodemailer";
import { envVar } from "../configs/env.variable.js";
const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    host: envVar.mailtrap.host,
    port: envVar.mailtrap.port,
    auth: {
      user: envVar.mailtrap.userName,
      pass: envVar.mailtrap.password,
    },
  });

  const emailOptions = {
    from: "AASTU BLOG SITE<hello@demomailtrap.co>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };
  await transporter.sendMail(emailOptions);
};

export default { sendEmail };
