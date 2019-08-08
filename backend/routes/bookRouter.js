const express = require('express');
const router = express.Router();
const goodreads = require('goodreads-api-node');
const gr = goodreads(require('../config/config'));

router.get('/search', async (req, res) => {
  console.log();
  let search = req.query['search'];
  const response = await gr.searchBooks({
    q: search,
    page: 1
  });
  console.log(response);
  // Returns query, results-start, results-end, total results, query time
  return res.json(response['search']);
});

module.exports = router;
