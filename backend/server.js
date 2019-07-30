import { goodreadsConfig } from '../client/src/components/api/config';
const express = require('express'),
  passport = require('passport'),
  util = require('util'),
  GoodreadsStrategy = require('passport-goodreads').Strategy;
// Express configurations
app.set('port', process.env.PORT || 3001);
// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

var methodOverride = require('method-override');
var session = require('express-session');
// all environments
app.use(methodOverride());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'uwotm8'
  })
);
// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Goodreads profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new GoodreadsStrategy(
    {
      consumerKey: goodreadsConfig.apiKey,
      consumerSecret: goodreadsConfig.secret,
      callbackURL: 'http://localhost:3000/booklist'
    },
    function(token, tokenSecret, profile, done) {
      process.nextTick(function() {
        console.log(profile.id);
        // To keep the example simple, the user's Goodreads profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the Goodreads account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);
const app = express();
// app.get('/login', function(req, res) {
//   res.render('login', { user: req.user });
// });
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
