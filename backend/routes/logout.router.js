const express = require('express');
const router = express.Router();
const passport = require('passport');
const { goodreads } = require('./auth.controller');
// Setting up the passport middleware for each of the OAuth providers
const goodreadsAuth = passport.authenticate('goodreads');

router.get('/logout').get(function(req, res) {
  res.send('Get a random book');
});

module.exports = router;
