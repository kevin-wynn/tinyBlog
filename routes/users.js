const express = require('express')
const mongoose = require('mongoose');
const moment = require('moment');

const router = express.Router();

// create a db connection
const connection = 'mongodb://localhost:27017/tinyBlog';

mongoose.connect(connection, (err) => {
    if (err) throw err;
});

const User = require('../models/users.js');

// admin users page
router.get('/admin/users', (req, res) => {
  User.find({}, (err, users)=> {
    res.render('admin/users', {users: users, moment: moment});
  })
})

// viewers users page
router.get('/users', (req, res) => {

})

// gets a users information by its id
router.get('/admin/user/getById/:id', (req, res) => {
  User.findOne({_id: req.params.id}, (err, user) => {
    if(err) console.log('There was an error getting the user', err);
    user.dob = moment(user.dob);
    res.render('admin/users/editUser', {user: user, moment: moment})
  })
})

router.get('/admin/user/createUser', (req, res) => {
  res.render('admin/users/createUser');
})

router.put('/admin/user/updateUser', (req, res) => {
  var userName = {username: req.body.username};
  req.body.dob = moment(req.body.dob);
  User.update(userName, req.body, {}, (err, user) => {
    res.send({message: 'User updated', user});
  })
})

router.post('/admin/user/createUser', (req, res) => {
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
