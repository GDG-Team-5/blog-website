import { DateTime } from "luxon";
import { handleCatchError, CustomError } from "../utils/index.js";
import { authService, tokenService } from "../services/index.js";
import { tokenTypes } from "../configs/token.types.js";
import { envVar } from "../configs/env.variable.js";
import passport from "../configs/passprt.js";
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
  delete req.user;
  const message = "logout successfully";
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

const handleGoogleAuthSuccess = (req, res) => {
  const token = tokenService.generateToken(
    req.user.id,
    tokenTypes.accessToken,
    DateTime.now().plus({ minutes: envVar.token.acessTokenExp })
  );
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`<!DOCTYPE html>
    <html lang="en">
    <head> 
    <title>Login Successful</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f8f9fa;
            }
            .container {
                text-align: center;
            }
            #token {
                word-wrap: break-word;
                width: 100%;
            }
        </style>
     </head>
    <body>
        <div class="container">
            <h2>Login Successful</h2>
            <p>You have successfully logged in.</p>
            <p>Your access token is:</p>
            <div id="token">${token}</div> 
             <p>
            </p>
        </div>
    </body>
    </html>
  `);
};

const handleGoogleAuthError = (req, res, next) => {
  return next(new CustomError(400, "Google authentication failed", true));
};

const initiateGoogleAuth = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const handleGoogleAuthCallback = passport.authenticate("google", {
  failureRedirect: `${envVar.serverUrl}/api/v1/auth/login`,
  session: true,
});

export default {
  register,
  login,
  logout,
  handlePasswordResetRequest,
  resetPassword,
  sentResetPasswordForm,
  handleGoogleAuthSuccess,
  handleGoogleAuthError,
  initiateGoogleAuth,
  handleGoogleAuthCallback,
};
