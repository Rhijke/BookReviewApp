const User = require('./User');
exports.addBook = function(req, res, next) {
  const addBook = [...req.user.savedBooks, req.params.id];
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
};

exports.deleteBook = function(req, res, next) {
  const deleteBook = req.user.savedBooks.map(book => bookId !== req.params.id);
  console.log(req.user);
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
};

exports.checkSavedBook = function(req, res, next) {
  const findBook = req.user.savedBooks.includes(req.params.id);
  console.log(req.user);
  User.findById({ _id: req.user._id }, 'savedBooks', function(err, user) {
    if (err) {
      res.json({
        error: err
      });
    } else {
      console.log(user);
      res.json({
        message: "Found user's saved book"
      });
    }
  });
};
