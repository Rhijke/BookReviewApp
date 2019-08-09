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
  savedBooks: {
    type: Array,
    default: []
  },
  goodreadsID: {
    type: Number,
    default: 0
  }
});

UserSchema.statics = {
  update: function(query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function(query, cb) {
    this.findOneAndDelete(query, cb);
  }
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
