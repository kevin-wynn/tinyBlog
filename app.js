const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');

const app = express();

// create a db connection
const connection = 'mongodb://localhost:27017/tinyBlog';

mongoose.connect(connection, (err) => {
    if (err) throw err;
});

const User = require('./models/users.js');

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
  // to keep from having to log in all the time during dev server restarts
  User.findOne({_id: '5a80e07aa6239b73e556528f'}, (err, user) => {
    req.session.user = user;
    req.session.save();
  });

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
const home = require('./routes/home');

app.use('/', home);
app.use('/login', login);
app.use('/logout', logout);
app.use('/admin', admin);
app.use(users);
app.use(posts);

app.listen(3000, () => {
  console.log('tinyBlog running on port 3000');
});
