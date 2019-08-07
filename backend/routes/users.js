const express = require('express');
const router = express.Router();
// Create User account in mongoDB
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Redirect login if no user authenticated
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('http://localhost:3000/');
  } else {
    next();
  }
};
const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect('http://localhost:3000/');
  } else {
    next();
  }
};
router.post('/login', redirectHome, function(req, res) {
  console.log('login post');
  const { email, password } = req.body;
  console.log(`${email} ${password}`);
  res.send('hello');
});
router.post('/register', redirectHome, function(req, res) {
  const { name, email, password, password2 } = req.body;
  let error = [];
  // Check all fields are filled in
  if (!name || !email || !password || !password2) {
    error.push({ msg: 'Please fill in all fields.' });
  }

  // Check that passwords match
  if (password !== password2) {
    error.push({ msg: 'Passwords do not match.' });
  }

  if (error.length > 0) {
    console.log(error);
  } else {
    console.log('Pass');
    // Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        error.push({ msg: 'Email is already in use.' });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hash
            newUser.password = hash;
            // Save new user to mongoDB
            newUser
              .save()
              .then(() => {
                req.flash('success_msg', 'You are now registerd.');
                res.redirect('http://localhost:3000/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }

  // Check length of password
  console.log(`register post `);
});

router.post('/logout', redirectLogin, function(req, res) {
  const { user } = res.locals;
  console.log(`${user.id}`);
  console.log('posted to logout');
  req.session.destroy(err => {
    if (err) console.log(err);
    res.clearCookie(SESS_NAME);
    res.redirect('http://localhost:3000/logout');
  });
});

module.exports = router;
