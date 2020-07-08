const param = require('commander');

// Needed because commander passes an additional value here that gets used as radix
myParseInt = value => parseInt(value);

param
    .option('-d, --days <number>', 'number of days the chart will go back', myParseInt, 60)
    .option('-c, --country <name>', 'target country (country name, iso2, iso3, or country ID code)', String,'US')
    .option('-h, --height <number>', 'max terminal chart height', myParseInt, 25)
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