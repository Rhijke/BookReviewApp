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
    res.json(req.user);
  }
  console.log(Object.keys(req));
});

module.exports = router;
