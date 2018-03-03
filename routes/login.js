const express = require('express')
const mongoose = require('mongoose');
const pageConfig = require('../pageConfig.js');

// TODO: remove once config functionality is in place
pageConfig.pageIntro = 'Login to get started';

const router = express.Router();

// create a db connection
const connection = 'mongodb://localhost:27017/tinyBlog';

mongoose.connect(connection, (err) => {
    if (err) throw err;
});

const User = require('../models/users.js');

router.get('/', (req, res) => {
  res.render('login', pageConfig)
})

router.post('/userLogin', (req, res) => {
  // create a new user object
  var newUser = new User(req.body);

  User.findOne({username: req.body.username}, (err, user) => {
    if(err) throw err;
    // no user found - return an error
    if(!user) {
      return({error: 'User not found'})
    } else {

      user.comparePassword(req.body.password, function(err, isMatch) {
        if(err) console.log('There was an error comparing the passwords:', err);
        if(isMatch) {
          // set the session variables
          req.session.user = user;
          req.session.save();
          res.send({success: 'User logged in successfully'})
        } else {
          res.send({error: 'Your password was incorrect'})
        }
      });
    }
  })
})

module.exports = router;
