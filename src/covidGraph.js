const  axios = require('axios');
const asciichart = require('asciichart');
const noColor = '\x1b[0m';
module.exports.plot = async ({height, days, disableCases, disableDeaths, disableRecovered, country}) => {
    const data = (await axios.get(`https://disease.sh/v3/covid-19/historical/${country}?lastdays=${days}`)).data;
    const lists = [
        disableCases ? []: Object.values(data.timeline.cases),
        disableRecovered ? []: Object.values(data.timeline.recovered),
        disableDeaths ? []: Object.values(data.timeline.deaths),
    ].filter(list => list.length);

    let response = asciichart.plot(lists, {
        height,
        colors: [
            disableCases ? '' : asciichart.blue,
            disableRecovered ? '': asciichart.green,
            disableDeaths ? '': asciichart.red
        ].filter(color => color)
    });
    const graphs = [disableCases, disableRecovered, disableDeaths].filter(graph => !graph).length;
    const casesString = disableCases ? '' : `${asciichart.blue}TotalCases${noColor}${graphs === 3 ? ',' : graphs === 2 ? ' and ' : ''} `;
    const recoveredString = disableRecovered ? '' : `${asciichart.green}Recovered${noColor}${!disableDeaths ? ' and' : ''} `;
    const deathsString = disableDeaths ? '' : `${asciichart.red}Deaths${noColor} `;
    response += `\n${country}: ${casesString}${recoveredString}${deathsString}in the last ${days} days`;
    return response;
};