const passport = require('passport');
var goodreadsConfig = require('../config/config');
var GoodreadsStrategy = require('passport-goodreads').Strategy;

module.exports = () => {
  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));

  const callback = (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  };

  passport.use(
    new GoodreadsStrategy(
      {
        consumerKey: goodreadsConfig.apiKey,
        consumerSecret: goodreadsConfig.secret,
        callbackURL: 'http://localhost:3002/goodreads/callback'
      },
      callback
    )
  );
};
