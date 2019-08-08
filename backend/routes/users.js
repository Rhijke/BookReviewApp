const express = require('express');
const router = express.Router();
const passport = require('passport');
// Create User account in mongoDB
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const redirectHome = (req, res, next) => {
  console.log('redirect home');
  if (req.session.user) {
    res.redirect('http://localhost:3000/');
  } else {
    next();
  }
};

router.post('/register', redirectHome, function(req, res) {
  const { name, email, password, password2 } = req.body.user;
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
    res.status(400).json({ error: error });
  } else {
    // Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        error.push({ msg: 'Email is already in use.' });
        res.send(error);
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
                res.status(200);
                res.send({
                  msg: 'You are now registered'
                });
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log('Login Post Called:');
    if (err) {
      console.log(err);
    }

    if (!user) {
      console.log(info);
      return res.status(400).send(info);
    } else {
      console.log(req.sessionID);
      req.logIn(user, function(err) {
        if (err) {
          res.status(400).send(err);
        }
        console.log(user);
        return res
          .status(200)
          .send({ message: `${user.name} logged in successfully.` });
      });
    }
  })(req, res, next);
});
// handle Logout GET request
router.post('/logout', (req, res) => {
  console.log('Logout post');
  console.log(req.user);
  req.logout();
  req.flash('success_msg', 'You are logged out.');
  res.redirect('http://localhost:3000/login');
});
module.exports = router;
