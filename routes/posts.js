const express = require('express')
const mongoose = require('mongoose');

const router = express.Router();

// create a db connection
const connection = 'mongodb://localhost:27017/tinyBlog';

mongoose.connect(connection, (err) => {
    if (err) throw err;
});

const Post = require('../models/posts.js');

router.get('/', (req, res) => {
  res.render('./admin/posts')
})

router.get('/getAllPosts', (req, res) => {
  Post.find({}, (err, posts) => {
    console.log(posts);
  })
})

router.post('/createPost', (req, res) => {

  // create a new post
  var newPost = new Post(req.body);

  Post.findOne({title: req.body.title}, (err, post) => {
    if(err) throw err;
    if(!post) {
      newPost.save((err, savedPost) => {
        if(err) throw err;
        res.send({success: {message: 'New post created'}, post: savedPost})
      });
    } else {
      res.send({message: 'This post already exists:', post});
    }
  })
})

module.exports = router;
