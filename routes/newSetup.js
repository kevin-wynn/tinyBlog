const express = require('express')
const mongoose = require('mongoose');

const router = express.Router();

// create a db connection
const connection = 'mongodb://localhost:27017/tinyBlog';

mongoose.connect(connection, (err) => {
    if (err) throw err;
});

const User = require('../models/users.js');

router.post('/', (req, res) => {
  var saveConfig = {},
      hashPassword = req.body.password;

  saveConfig.database = {};
  saveConfig.admin = {};
  saveConfig.site = {};

  saveConfig.site.title = req.body.title;
  saveConfig.site.url = req.body.url;
  saveConfig.admin.fullName = req.body.fullName;
  saveConfig.admin.username = req.body.username;
  saveConfig.admin.password = hashPassword;
  saveConfig.admin.dob = req.body.dob;
  saveConfig.database.databaseName = req.body.databaseName;
  saveConfig.database.databaseUrl = req.body.databaseUrl;
})

module.exports = router;
