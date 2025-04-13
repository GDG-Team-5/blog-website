import nodemailer from "nodemailer";
import { envVar } from "../configs/env.variable.js";
import logger from "../configs/wins.logger.js";
import { CustomError, logError } from "../utils/index.js";
const emailSettings = {
  host: envVar.mail.host,
  port: envVar.mail.port,
  secure: envVar.mail.secure,
  auth: {
    user: envVar.mail.userName,
    pass: envVar.mail.password,
  },
};

const transporter = nodemailer.createTransport(emailSettings);

const sendEmail = async (recipient, subject, html) => {
  const mailOptions = {
    from: `"${envVar.mail.appName}" <${envVar.mail.from}>`,
    to: recipient,
    subject: subject,
    text: "",
    html: html,
  };
  try {
    const sentEmail = await transporter.sendMail(mailOptions);
  } catch (error) {
    logError(error);
    throw new CustomError(500, "failed to sent email", false);
  }
};

const sendResetPasswordLink = async (email, token) => {
  try {
    const resetLink = `${envVar.serverUrl}/api/v1/auth/reset-password-form?token=${token}`;
    console.log(resetLink);
    const subject = "Reset Password";
    const html = `
      <p>You have requested to reset your password. Please click on the following link to reset it:</p>
      <p><a href="${resetLink}">Reset Password</a></p>
      <p>This link will expire shortly. If you did not request a password reset, please ignore this email.</p>
    `;
    await sendEmail(email, subject, html);
    logger.infoLogger.info(`Reset password email sent to ${email}`);
  } catch (error) {
    logError(error);
    throw new CustomError(500, "Failed to send reset password link", false);
  }
};

export default { sendEmail, sendResetPasswordLink };
