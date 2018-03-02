const express = require('express')
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  // destroy the user from the session and redirect to home
  req.session.destroy()
  res.redirect('../')
})

module.exports = router;
