const express = require('express')
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();

// create a db connection
const connection = 'mongodb://localhost:27017/tinyBlog';

mongoose.connect(connection, (err) => {
    if (err) throw err;
});

const Post = require('../models/posts.js');

// TODO: remove pageConfig once config functionality is in place
const pageConfig = require('../pageConfig.js');

pageConfig.moment = moment;

router.get('/', (req, res) => {
  Post.find({}, (err, allPosts) => {
    pageConfig.posts = allPosts;
    // truncate text and add ellipsis if longer than 250 characters
    // format date to be readable with moment
    allPosts.map((post, i) => {
      post.content = post.content.substring(0,250);
      post.content += '...';
    })
    res.render('index', pageConfig);
  })
})

module.exports = router;
