const express = require('express');
const router = express.Router();
const covidGraph = require('../../src/covidGraph');
const { DEFAULT_ARGS } = require('../../src/consts');

/* GET users listing. */
router.get('/', async (req, res) => {
    const response = await covidGraph.plot({
        ...DEFAULT_ARGS,
        ...req.query,
        disableCases: (req.query.disableCases || '').toLowerCase() === 'true',
        disableRecovered:
            (req.query.disableRecovered || '').toLowerCase() === 'true',
        disableDeaths: (req.query.disableDeatjs || '').toLowerCase() === 'true',
    });
    res.send(response);
});

module.exports = router;
