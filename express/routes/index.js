const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/*', function(_req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

module.exports = router;
