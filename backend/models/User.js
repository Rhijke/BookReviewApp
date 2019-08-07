const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  },
  savedBooks: {
    type: Array,
    default: []
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
