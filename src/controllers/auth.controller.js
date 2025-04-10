import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { handleCatchError } from "../utils/index.js";
import { User } from "../models/index.js";
import { authService, tokenService } from "../services/index.js";
import { envVar } from "../configs/env.variable.js";

const googleAuthConfig = {
  clientID: envVar.googeClient.id,
  clientSecret: envVar.googeClient.secret,
  callbackURL: `${envVar.serverUrl}/api/v1/auth/google/callback`,
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
  const { id } = req.user;
  const { message } = await authService.logout(id);
  res.status(200).json({ message });
});

const handlePasswordResetRequest = handleCatchError(async (req, res) => {
  const { email } = req.body;
  const { message } = await authService.handlePasswordResetRequest(email);
  res.status(200).json({ message });
});
const resetPassword = handleCatchError(async (req, res) => {
  const { token, newPassword } = req.body;
  const message = await authService.resetPassword(token, newPassword);
  res.status(200).send(message);
});
const sentResetPasswordForm = handleCatchError(async (req, res) => {
  const { token } = req.query;
  const decoded = tokenService.verifyToken(token);
  const resetForm = await authService.CreateRsetForm(token);
  res.status(200).send(resetForm);
});
const sendTOken = handleCatchError(async (req, res) => {
  const token = tokenService.generateToken(req.user.id);
  return token;
});

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

export default {
  register,
  login,
  logout,
  handlePasswordResetRequest,
  resetPassword,
  sentResetPasswordForm,
  sendTOken,
};
