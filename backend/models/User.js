const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: True
  },
  email: {
    type: String,
    required: True
  },
  password: {
    type: String,
    required: True
  },
  id: {
    type: Number,
    required: True
  },
  savedBooks: {
    type: Array,
    default: []
  }
});

const User = mongoose.model('User', UserSchema);
model.exports = User;
