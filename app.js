const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');

const app = express();

// morgan logger
app.use(morgan('tiny'))

// trust first proxy
app.set('trust proxy', 1);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// inlcude public files
app.use('/public', express.static(__dirname + '/public'));

// session options
app.use(session({
  secret: 'tinyBlog',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// set view enginge to use pug
app.set('view engine', 'pug');

// set a check for user on all admin pages
app.all('*', checkUser);

function checkUser(req, res, next) {
  if (~req.path.indexOf('admin')) {
    if(req.session.user) {
      app.locals.user = req.session.user;
    } else {
      res.redirect('/login')
    }
  }

  next();
}

// routes
const login = require('./routes/login');
const logout = require('./routes/logout');
const admin = require('./routes/admin');
const users = require('./routes/users');
const posts = require('./routes/posts');
const newSetup = require('./routes/newSetup');
const home = require('./routes/home');

app.use('/', home);
app.use('/newSetup', newSetup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/admin', admin);
app.use('/admin/users', users);
app.use('/admin/posts', posts);

app.listen(3000, () => {
  console.log('tinyBlog running on port 3000');
});
