# covid-graph
ASCII graph data for COVID-19.

## How to use
* clone the repo: `git clone git@github.com:cgsimmons/covid-graph.git`
* cd into directory: `cd covid-graph`
* install node packages: `npm i`
* run the cli: `./bin/covid-graph-cli`
* run the server: `npm run start`

## CLI options
`./bin/covid-graph-cli --help`

## HTTP options
`localhost:3000/graph/help`
* days: Number of days before the current day to start collecting data (x axis)
* height: Number of rows to allow for y axis
* country: Target country name or code
* disableCases: Remove total case data from results
* disableRecovered: Remove recovered case data from results
* disableDeaths: emove deaths data from results