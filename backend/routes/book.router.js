const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const goodreads = require('goodreads-api-node');
const gr = goodreads(require('../config/config'));
const grConfig = require('../config/config');
const cors = require('cors');
const request = require('request');
router.options('GET', cors());
router.get('/goodreads/callback', (req, res) => {
  console.log('Callback called');
  const { error, error_description, error_uri } = req.query;
  if (error) {
    res.status(500).json({
      error,
      error_description,
      error_uri
    });
  } else {
    console.log(req.query);
    console.log(req.session);
    console.log(Object.keys(req));

    res.end();
  }
});

router.get('/loggedIn', (req, res) => {
  console.log(req.session);
  if (req.session.grant) {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
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

router.get('/search/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  console.log(bookId);
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
  req.session.review = {
    bookId,
    rating,
    review
  };
  console.log(req.session);

  if (!req.session.grant) res.send({ goodreadsAuth: false });
  else {
    // Attempt to make the post request to goodreads
    console.log(grConfig.key);
    console.log(grConfig.secret);
    console.log(req.session['grant']['request'].oauth_token);
    console.log(req.session['grant']['request'].oauth_token_secret);
    request.post(
      {
        url: 'https://www.goodreads.com/review.xml',
        oauth: {
          consumer_key: grConfig.key,
          consumer_secret: grConfig.secret,
          token: req.session['grant']['request'].oauth_token,
          token_secret: req.session['grant']['request'].oauth_token_secret
        }
      },
      function(e, r, body) {
        console.log('Request POST callback');
        console.log(e);
        console.log(Object.keys(r));
        console.log(`${r.statusCode} ${r.statusMessage}`);
        console.log(r.body);
      }
    );
  }

  res.end();
});

module.exports = router;
