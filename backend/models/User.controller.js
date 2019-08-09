var User = require('./User');
exports.addBook = function(req, res, next) {
  var addBook = [...req.user.savedBooks, req.params.id];
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
  let deleteBook = req.user.savedBooks.map(book => bookId !== req.body.bookId);
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
