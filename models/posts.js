const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: String,
  date: Date,
  content: String,
  author: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Post', postSchema);
