import { DateTime } from "luxon";
import { User } from "../models/index.js";
import { CustomError } from "../utils/index.js";
import tokenService from "./token.service.js";
import userService from "./user.service.js";
import { tokenTypes } from "../configs/token.types.js";
import { envVar } from "../configs/env.variable.js";
import emailService from "./email.service.js";

//Function to register a new user
const register = async (userData) => {
  const { userName, email, password } = userData;
  if (await User.isEmailUsed(email)) {
    throw new CustomError(400, "Email already exists", true);
  }
  const user = await User.create({ userName, email, password });
  if (!user) {
    throw new CustomError(400, "User registration failed", true);
  }
  return { message: "User registered successfully", user: user };
};

//Function to login a user
const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError(400, "Invalid email or password", true);
  }
  const isMatch = await user.verifyPassword(password);
  if (!isMatch) {
    throw new CustomError(400, "Invalid email or password", true);
  }
  const token = tokenService.generateToken(
    user.id,
    tokenTypes.accessToken,
    DateTime.now().plus({ minutes: envVar.token.acessTokenExp })
  );
  return { message: "Login successfully", token: token };
};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Failed to logout." });
    }
  });

  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.cookie("connect.sid", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in logout controller", error.message);
  }
};

const handlePasswordResetRequest = async (email) => {
  const message = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Successful</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
          }
          .container {
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          h1 {
            color: #28a745;
            margin-bottom: 20px;
          }
          p {
            color: #555;
            margin-bottom: 15px;
          }
          a {
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Password Reset Successfully</h1>
          <p>Your password has been successfully reset.</p>
          <p>You can now <a href="/login">log in</a> with your new password.</p>
        </div>
      </body>
      </html>
    `;
  const user = await userService.getUserByEmail(email);
  const resetToken = await tokenService.generateResetToken(user.id);
  await emailService.sendResetPasswordLink(email, resetToken);
  return message;
};

const resetPassword = async (token, newPassword) => {
  const decoded = await tokenService.verifyToken(token);
  const user = await User.findById(decoded.sub);
  if (!user) {
    throw new CustomError(400, "Invalid token", true);
  }
  user.password = newPassword;
  user.tokenExpiration = null;
  user.resetToken = null;
  await user.save();
  return `<h1>Password reset successfully</h1>`;
};
const CreateRsetForm = async (token) => {
  const decoded = tokenService.verifyToken(token);
  const user = await User.findById(decoded.sub);
  if (!user) {
    throw new CustomError(403, "Invalid Token", true);
  }
  const resetLink = `${envVar.serverUrl}/api/v1/auth/reset-password`;
  const resetHtml = `
    <style>
      body {
        font-family: sans-serif;
        background-color: #f4f4f4;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        margin: 0;
      }
      .reset-container {
        background-color: #fff;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        width: 350px;
        text-align: center;
      }
      h2 {
        color: #333;
        margin-bottom: 20px;
      }
      label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: bold;
        text-align: left;
      }
      input[type="password"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 16px;
      }
      button[type="submit"] {
        background-color: #007bff;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s ease;
      }
      button[type="submit"]:hover {
        background-color: #0056b3;
      }
      .error-message {
        color: red;
        margin-top: 10px;
      }
    </style>
    <div class="reset-container">
      <h2>Reset Your Password</h2>
      <form action="${resetLink}" method="POST">
        <input type="hidden" name="token" value="${token}" />
        <div>
          <label for="newPassword">New Password:</label>
          <input type="password" name="newPassword" required />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  `;
  return resetHtml;
};
export default {
  register,
  login,
  logout,
  handlePasswordResetRequest,
  resetPassword,
  CreateRsetForm,
};
