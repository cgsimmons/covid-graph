const param = require('commander');
const {
    DEFAULT_ARGS
} = require('./consts');
// Needed because commander passes an additional value here that gets used as radix
myParseInt = value => parseInt(value);

param
    .option('-d, --days <number>', 'number of days the chart will go back', myParseInt, DEFAULT_ARGS.days)
    .option('-c, --country <name>', 'target country (country name, iso2, iso3, or country ID code)', String, DEFAULT_ARGS.country)
    .option('-h, --height <number>', 'max terminal chart height', myParseInt, DEFAULT_ARGS.height)
    .option('-R --no-recovered', 'Disable recoveries')
    .option('-D --no-deaths', 'Disable deaths')
    .option('-C --no-cases', 'Disable total cases')
    .parse(process.argv);

module.exports =  {
    days: param.days,
    country: param.country,
    height: param.height,
    disableCases: param.cases === false,
    disableRecovered: param.recovered === false, 
    disableDeaths: param.deaths === false
}