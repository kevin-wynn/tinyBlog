const express = require('express')
const mongoose = require('mongoose');

// TODO: remove pageConfig once config functionality is in place
const pageConfig = require('../pageConfig.js');

const router = express.Router();

// create a db connection
const connection = 'mongodb://localhost:27017/tinyBlog';

mongoose.connect(connection, (err) => {
    if (err) throw err;
});

const User = require('../models/users.js');

router.get('/', (req, res) => {
  res.render('./signup', pageConfig)
})

module.exports = router;
