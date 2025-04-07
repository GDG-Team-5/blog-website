<<<<<<< HEAD
import { authService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";

//register user middleware
const register = handleCatchError(async (req, res) => {
  const { message, user } = await authService.register(req.body);
  res.status(201).json({ message, user });
});

//login user middleware
const login = handleCatchError(async (req, res) => {
  const { email, password } = req.body;
  const { message, token } = await authService.login(email, password);
  res.status(200).json({ message, token });
});

const logout = handleCatchError(async (req, res) => {
  const user = { id: "1" };
  const { id } = user;
  const { message } = await authService.logout(id);
  res.status(200).json({ message });
});

export default { register, login, logout };
=======
import { authService } from "../services/index.js";
import { handleCatchError } from "../utils/index.js";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendEmail from "../services/sendEmail.js";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import dotenv from "dotenv";
dotenv.config();
const googleAuthConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/auth/google/callback",
  passReqToCallback: true,
};

//register user middleware
const register = handleCatchError(async (req, res) => {
  const { message, user } = await authService.register(req.body);
  res.status(201).json({ message, user });
});

//login user middleware
const login = handleCatchError(async (req, res) => {
  const { email, password } = req.body;
  const { message, token } = await authService.login(email, password);
  res.status(200).json({ message, token });
});

const logout = handleCatchError(async (req, res) => {
  const user = { id: "1" };
  const { id } = user;
  const { message } = await authService.logout(id);
  res.status(200).json({ message });
});

const passwordResetRequest = async (req, res) => {
  const user = req.user;
  try {
    const resetToken = crypto.randomBytes(10).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 10);
    user.resetToken = hashedToken;
    user.tokenExpiration = Date.now() + 10 * 60 * 1000;
    await user.save();

    //send the link
    try {
      const resetURL = `${req.protocol}://${req.get(
        "host"
      )}/api/auth/reset-password/${resetToken}`;
      const resetMessage = {
        email: user.email,
        message: `Here is a link to reset Your password. If You did'nt request for a password reset simply ignore this message\n\n${resetURL}\n\nThe link expires in 10 minutes.`,
        subject: "reset your password",
      };
      await sendEmail(resetMessage);
      res.status(200).json({
        status: "success",
        message: "Password reset email sent successfully.",
      });
    } catch (error) {
      user.resetToken = null;
      user.tokenExpiration = null;
      await user.save();
      console.log("error sending password reset email", error.message);
      return res.json({ message: "failed to send password reset link." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in passwordResetRequest controller", error.message);
  }
};

const resetPassword = async (req, res) => {
  const resetToken = req.params.token;
  const user = req.user;
  const { newPassword } = req.body;
  try {
    console.log(resetToken);
    const isTokenValid = await bcrypt.compare(resetToken, user.resetToken);
    if (!isTokenValid) {
      return res
        .status(400)
        .json({ message: "Unauthorized - invalid token used." });
    }

    if (user.tokenExpiration < Date.now()) {
      return res.status(400).json({ message: "Unauthorized - Token expired." });
    }
    // hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    //clear the resetToken
    user.tokenExpiration = null;
    user.resetToken = null;
    await user.save();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error in resetPassword controller", error.message);
  }
};

// GOOGLE AUTH
const googleVerifyCallback = async (
  request,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      return done(
        new Error("Google profile does not contain an email address."),
        null
      );
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      fullName: profile.displayName,
      email: profile.emails?.[0]?.value,
    });

    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    console.error("Error during Google authentication:", error);
    return done(error, null);
  }
};

passport.use(new GoogleStrategy(googleAuthConfig, googleVerifyCallback));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error, null);
  }
});

export const initializeGoogleAuth = () => {};

export default { register, login, logout, passwordResetRequest, resetPassword };
>>>>>>> d7ecc22599000fdc65845647780015dc7cb8f7b8
