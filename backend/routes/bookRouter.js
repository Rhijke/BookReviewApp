const express = require('express');
const router = express.Router();
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
  if (!req.user) {
    res.json({ loggedIn: false });
  } else {
    console.log(Object.keys(req));
    res.json({
      name: req.user.name,
      savedBooks: req.user.savedBooks,
      loggedIn: true
    });
  }
  console.log(Object.keys(req));
});

router.post('/save', (req, res) => {
  console.log(res.query);
});
router.get('/:bookId', async (req, res) => {
  const bookId = req.params.bookId;
  const response = await gr.showBook(bookId);
  console.log(response);
  res.json(response['book']);
});

module.exports = router;
