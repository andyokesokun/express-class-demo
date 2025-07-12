import { Application } from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const configureGoogleAuth = (app: Application) => {
  app.use(
    session({ secret: "secret", resave: false, saveUninitialized: true })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_AUTH_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_AUTH_SECRET_KEY as string,
        callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URL as string,
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj as any));

};

export default configureGoogleAuth;
