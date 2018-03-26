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
  if (~req.path.indexOf('admin') || ~req.path.indexOf('login')) {

    /**
     * This sets the admin on the session so you dont have to keep logging back in each time the server restarts
     * Will def need to be removed before any deployments
     *
     * TODO: Remove this before deploy
     */
    req.session.user = {"_id":{"$oid":"5aa1fb2647d3f46fc111941b"},"name":"Admin","email":"admin@tinyblog.com","username":"admin","dob":{"$date":"2018-02-10T17:00:00.000Z"},"active":true,"__v":0}

    if(~req.path.indexOf('login')) {
      res.redirect('/admin')
    }

    if(req.session.user) {
      app.locals.user = req.session.user;
    } else {
      res.redirect('/login')
    }
  }

  next();
}

// routes
const signup = require('./routes/signup');
const login = require('./routes/login');
const logout = require('./routes/logout');
const admin = require('./routes/admin');
const users = require('./routes/users');
const posts = require('./routes/posts');
const home = require('./routes/home');

app.use('/', home);
app.use('/signup', signup);
app.use('/login', login);
app.use('/logout', logout);
app.use('/admin', admin);
app.use(users);
app.use(posts);

app.listen(3000, () => {
  console.log('tinyBlog running on port 3000');
});
