const express = require('express');
const router = express.Router();

const index = `
<!DOCTYPE html>
    <html>
        <head>
            <title>Covid-Graph</title>
        </head>
        <style>
            body {padding: 0 50px; font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;}
            a {color: #00B7FF;}
            h1, h2, h3 {margin-bottom: 0px;padding: 0px 5px;}
            p, ul {margin-top: 0px;padding-top: 0px;}
            .highlight {background-color: #c1c1df; width: max-content;}
            .highlight-inner {background-color: #a1e0f9; width: max-content;}
        </style>
        <body>
            <div class="highlight"><h1>Covid-Graph</h1></div>
            <p>Welcome to Covid-Graph</p>
            <div class="highlight-inner"><h2>cURL</h2></div>
            <p> Simply curl the "/graph" path with any of the optional parameters.</p>
            <h3>Options</h3>
            <ul> 
                <li>days: Number of days before the current day to start collecting data (x axis)</li>
                <li>height: Number of rows to allow for y axis</li>
                <li>country: Target country name or code</li>
                <li>disableCases: Remove total case data from results</li>
                <li>disableRecovered: Remove recovered case data from results</li>
                <li>disableDeaths: Remove deaths data from results</li>
                <li>disableBox: Remove enclosing graph box for simpler display</li>
            </ul>
            <h3>Examples</h3>
            <ul>
                <li>curl "https://covid-graph.cgsimmons.dev/graph"</li>
                <li>curl "https://covid-graph.cgsimmons.dev/graph?days=10&height=10&disableCases=true&disableRecovered=true&country=Japan"</li>
            </ul>
            <div class="highlight-inner"><h2>CLI</h2></div>
            <p>  Covid-Graph is built in node and available on github. Within the codebase is a covid-graph-cli command that can be used to generate the graph data locally. Visit the repo on <a href="https://github.com/cgsimmons/covid-graph">github </a>for more info.</p>
        </body>
    </html>
`;

/* GET home page. */
router.get('/*', function (_req, res) {
    res.send(index);
});

module.exports = router;
