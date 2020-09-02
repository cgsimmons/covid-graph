const express = require('express');
const router = express.Router();
const { DEFAULT_ARGS } = require('../../src/consts');

/* GET help information. */
router.get('/', async (req, res) => {
    res.send(
        `Help: call '/graph' with any of the following optional query parameters: \n${Object.entries(
            DEFAULT_ARGS,
        )
            .map(([key, value]) => `    ${key}:  ${value}`)
            .join('\n')}\n`,
    );
});

module.exports = router;
