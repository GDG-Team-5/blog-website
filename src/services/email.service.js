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
    html: option.html,
  };
  return await transporter.sendMail(emailOptions);
};

const sendResetPasswordLink = async (email, token) => {
  mailOption = {
    subject: "Reset Password",
    html: `<form action="${envVar.serverUrl}api/v1/auth/reset-password" method="POST">
    <input type="hidden" name="token" value="${token}" />
    <input type="password" name="password" value="" placeholder="New Password"/>
    <button type="submit">Click here to reset your password</button>
  </form>`,
    email: email,
  };

  await sendEmail(mailOptions);
};

export default { sendEmail, sendResetPasswordLink };
