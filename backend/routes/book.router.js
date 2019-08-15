const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const goodreads = require('goodreads-api-node');
const gr = goodreads(require('../config/config'));
const cors = require('cors');
const goodreadsConfig = require('../config/config');
const GoodreadsStrategy = require('passport-goodreads').Strategy;
const passport = require('passport');
gr.initOAuth('/goodreads/callback');
passport.use(
  new GoodreadsStrategy(
    {
      consumerKey: goodreadsConfig.key,
      consumerSecret: goodreadsConfig.secret,
      callbackURL: 'http://localhost:3002/goodreads/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Access Token:');
      console.log(accessToken);
      console.log('Profile: ');
      console.log(profile);
      return done(null, profile);
    }
  )
);
const goodreadsAuth = passport.authenticate('goodreads');

router.get('/goodreads', goodreadsAuth);
router.get('/goodreads/callback', goodreadsAuth, (req, res) => {
  console.log('Callback called');
  const { error, error_description, error_uri } = req.query;
  if (error) {
    res.status(500).json({
      error,
      error_description,
      error_uri
    });
  } else {
    res.cookie('access-token-goodreads', req.query.access_token);
    res.end();
  }
});

router.get('/search', async (req, res) => {
  let search = req.query['search'];
  const response = await gr.searchBooks({
    q: search,
    page: 1
  });
  console.log(response);
  // Returns query, results-start, results-end, total results, query time
  return res.json(response['search']);
});

router.get('/booklist', async (req, res) => {
  console.log('Book List user');
  console.log(req.user);

  if (req.user) {
    res.json({
      name: req.user.name,
      savedBooks: req.user.savedBooks,
      loggedIn: true
    });
  } else {
    res.json({ loggedIn: false });
  }
});

router.get('/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  try {
    const response = await gr.showBook(bookId);
    res.json(response['book']);
  } catch (err) {
    console.log(err);
  }
});

router.post('/writereview/:bookId', (req, res) => {
  const bookId = req.params.bookId;
  const rating = req.body['rating'];
  const review = req.body['review'];
  console.log(bookId);
  console.log(rating);
  console.log(review);

  res.end();
});

module.exports = router;
