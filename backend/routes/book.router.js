const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const goodreads = require('goodreads-api-node');
const gr = goodreads(require('../config/config'));

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

router.post('/writereview/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  const rating = req.body['rating'];
  const review = req.body['review'];
  console.log(bookId);
  console.log(rating);
  console.log(review);
  res.end();
});

module.exports = router;
