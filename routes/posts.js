const express = require('express')
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();

require('dotenv').config();

// create a db connection
const connection = 'mongodb+srv://'+process.env.mongoUsername+':'+process.env.mongoPassword+'@'+process.env.mongoCluster+'.mongodb.net/test?retryWrites=true';

mongoose.connect(connection, (err) => {
    if (err) throw err;
});

const Post = require('../models/posts.js');

getAllPosts = (cb) => {
  Post.find({}, (err, allPosts) => {
    return cb(allPosts)
  });
}

router.get('/admin/posts', (req, res) => {
  getAllPosts((posts) => {
    // truncate text and add ellipsis if longer than 250 characters
    // format date to be readable with moment
    posts.map((post, i) => {
      post.content = post.content.substring(0,100);
      post.content += '...';
    })

    res.render('./admin/posts', {posts: posts, moment: moment})
  });
})

router.get('/posts', (req, res) => {
  getAllPosts((posts) => {
    res.render('./posts', {posts: posts, moment: moment})
  });
})

router.get('/getAllPosts', (req, res) => {
  getAllPosts((posts) => {
    res.send({posts: posts})
  });
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
