const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// inlcude public files
app.use('/public', express.static(__dirname + '/public'));

// set view enginge to use pug
app.set('view engine', 'pug')

// routes
const admin = require('./routes/admin');
const users = require('./routes/users');
const posts = require('./routes/posts');

app.use('/admin', admin);
app.use('/admin/users', users);
app.use('/admin/posts', posts);

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});

app.listen(3000, () => {
  console.log('tinyBlog listening on port 3000')
});
