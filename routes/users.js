const express = require('express')
const mongoose = require('mongoose');

const router = express.Router();

// create a db connection
const connection = 'mongodb://localhost:27017/tinyBlog';

mongoose.connect(connection, (err) => {
    if (err) throw err;
});

const User = require('../models/users.js');

router.get('/', (req, res) => {
  User.find({}, (err, users)=> {
    res.render('admin/users', {users: users});
  })
})

router.post('/createUser', (req, res) => {
  // create a new user
  var newUser = new User(req.body);

  User.findOne({username: req.body.username}, (err, user) => {
    if(err) throw err;
    if(!user) {
      newUser.save((err, savedUser) => {
        if(err) throw err;
        res.send({success: {message: 'New user created'}, user: savedUser})
      });
    } else {
      res.send({error: {message: 'User already exists'}})
    }
  })
})

module.exports = router;
