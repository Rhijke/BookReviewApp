const express = require('express');
const router = express.Router();
const passport = require('passport');
const { goodreads } = require('./auth.controller');
// Setting up the passport middleware for each of the OAuth providers
const goodreadsAuth = passport.authenticate('goodreads');

router.get('/goodreads/callback', goodreadsAuth, goodreads);

router.use((req, res, next) => {
  req.session.socketId = req.query.socketId;
  next();
});
// Routes that are triggered by the React client
router.get('/goodreads', goodreadsAuth);

module.exports = router;
