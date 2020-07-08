#!/usr/bin/env node

const covidGraph = require('./src/covidGraph');
const args = require('./src/arguments.js');

covidGraph.plot(args);