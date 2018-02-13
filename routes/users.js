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
    res.render('users', {users: users});
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

// router.get('/testUser', (req, res) => {
//   // create a user a new user
//   var testUser = new User({
//       username: 'jmar777',
//       password: 'Password123'
//   });
//
//   // save user to database
//   testUser.save((err) => {
//       if (err) throw err;
//
//       // fetch user and test password verification
//       User.findOne({ username: 'jmar777' }, function(err, user) {
//           if (err) throw err;
//
//           // test a matching password
//           user.comparePassword('Password123', function(err, isMatch) {
//               if (err) throw err;
//               console.log('Password123:', isMatch); // -> Password123: true
//           });
//
//           // test a failing password
//           user.comparePassword('123Password', function(err, isMatch) {
//               if (err) throw err;
//               console.log('123Password:', isMatch); // -> 123Password: false
//           });
//       });
//   });
// })

module.exports = router;
