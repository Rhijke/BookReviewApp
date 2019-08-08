const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// handle booklist page
router.get('/booklist', (req, res) => {
  console.log('get book list');
  console.log(Object.keys(req));
  console.log(req.session);
  res.send(req.user);
});
module.exports = router;
