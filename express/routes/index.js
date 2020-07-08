const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/*', function(_req, res) {
  res.render('index', { title: 'Covid-Graph' });
});

module.exports = router;
