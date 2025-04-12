import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { envVar } from "../configs/env.variable.js";
import { User } from "../models/index.js";
import { CustomError, logError } from "../utils/index.js";

const googleAuthConfig = {
  clientID: envVar.googeClient.id,
  clientSecret: envVar.googeClient.secret,
  callbackURL: `${envVar.serverUrl}/api/v1/auth/google/callback`,
  passReqToCallback: true,
};

const googleVerifyCallback = async (
  request,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const email = profile.emails[0].value;
    const user = await User.findOne({ email });
    if (user) {
      return done(null, user);
    } else {
      return done(
        new CustomError(
          403,
          "No user found with this email.  Please create an account.",
          true
        ),
        null
      );
    }
  } catch (error) {
    logError(error);
    return done(error, null);
  }
};

const googleStrategy = new GoogleStrategy(
  googleAuthConfig,
  googleVerifyCallback
);
passport.use(googleStrategy);
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

export default passport;
