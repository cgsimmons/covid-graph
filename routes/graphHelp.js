const express = require('express');
const router = express.Router();
const {
  DEFAULT_ARGS
} = require('../src/consts');

router.get('/', async (req, res) => {
  res.send(`call '/stats' with any of the following optional parameters ${JSON.stringify(DEFAULT_ARGS)}`);
});

module.exports = router;