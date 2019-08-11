const User = require('./User');
exports.addBook = function(req, res, next) {
  if (req.user) {
    const addBook = [...req.user.savedBooks, req.params.id];
    console.log(addBook);
    User.updateOne({ _id: req.user._id }, { savedBooks: addBook }, function(
      err,
      user
    ) {
      if (err) {
        res.json({
          error: err
        });
      } else {
        res.json({
          message: 'Book added successfully'
        });
      }
    });
  } else {
    req.json({
      loggedIn: false,
      message: 'Please login first.'
    });
  }
};

exports.deleteBook = function(req, res, next) {
  if (req.user) {
    const deleteBook = req.user.savedBooks.filter(
      book => book !== req.params.id
    );
    console.log(deleteBook);
    User.updateOne({ _id: req.user._id }, { savedBooks: deleteBook }, function(
      err,
      user
    ) {
      if (err) {
        res.json({
          error: err
        });
      } else {
        res.json({
          message: 'Book removed successfully'
        });
      }
    });
  } else {
    res.json({
      loggedIn: false,
      message: 'Please login first.'
    });
  }
};

exports.checkSavedBook = function(req, res, next) {
  if (req.user) {
    const findBook = req.user.savedBooks.includes(req.params.id);
    console.log(findBook);
    if (findBook) {
      res.json({
        saved: true
      });
    } else {
      res.json({
        saved: false
      });
    }
  } else {
    res.json({
      loggedIn: false,
      message: 'Please login first.'
    });
  }
};
