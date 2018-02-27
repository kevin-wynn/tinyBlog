const express = require('express')
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('./admin/index')
})

module.exports = router;
