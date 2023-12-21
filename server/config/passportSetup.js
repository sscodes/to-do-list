const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/userModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/api/users/google/redirect',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            done(null, currentUser);
          } else {
            new User({ name: profile.displayName, googleId: profile.id })
              .save()
              .then((newUser) => done(null, newUser))
              .catch((err) => console.error(err));
          }
        })
        .catch((err) => console.error(err));
    }
  )
);
