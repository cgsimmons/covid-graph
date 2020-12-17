const axios = require('axios');
const asciichart = require('asciichart');
const { getMaxListeners } = require('../express/app');
const noColor = '\x1b[0m';

const formatDate = (dateObject) =>
    dateObject.toLocaleDateString('en-US', { timeZone: 'UTC' });

module.exports.plot = async ({
    height,
    days,
    disableCases,
    disableDeaths,
    disableRecovered,
    disableBox,
    country,
}) => {
    const data = (
        await axios.get(
            `https://disease.sh/v3/covid-19/historical/${country}?lastdays=${days}`,
        )
    ).data;
    const lists = [
        disableCases ? [] : Object.values(data.timeline.cases),
        disableRecovered ? [] : Object.values(data.timeline.recovered),
        disableDeaths ? [] : Object.values(data.timeline.deaths),
    ].filter((list) => list.length);

    // Calulate Y axis label padding by largest data string length
    const padding = ' '.repeat(
        Math.max(...lists.map((list) => Math.max(...list))).toString().length,
    );

    let response = asciichart.plot(lists, {
        height,
        colors: [
            disableCases ? '' : asciichart.blue,
            disableRecovered ? '' : asciichart.green,
            disableDeaths ? '' : asciichart.red,
        ].filter((color) => color),
        // Removes default decimal precision
        format: (x) => (padding + x.toFixed(0)).slice(-padding.length),
    });
    const graphs = [disableCases, disableRecovered, disableDeaths].filter(
        (graph) => !graph,
    ).length;
    const casesString = disableCases
        ? ''
        : `${asciichart.blue}TotalCases${noColor}${
              graphs === 3 ? ',' : graphs === 2 ? ' and ' : ''
          } `;
    const recoveredString = disableRecovered
        ? ''
        : `${asciichart.green}Recovered${noColor}${
              !disableDeaths ? ' and' : ''
          } `;
    const deathsString = disableDeaths
        ? ''
        : `${asciichart.red}Deaths${noColor} `;
    const currentDate = new Date();
    const startDate = new Date();
    startDate.setDate(currentDate.getDate() - days);

    if (!disableBox) {
        // Buffer for X axis at top and bottom of graph (1 character larger than padding)
        const xBuffer = padding.length + 1;
        const xAxisTop = `┌${'─'.repeat(xBuffer)}${'┬'.repeat(days)}┐`;
        const xAxisBottom = `└${'─'.repeat(xBuffer)}${'┴'.repeat(days)}┘`;
        response = response
            .split('\n')
            .map((line) => {
                const colors =
                    line[line.length - 2] == 'm' &&
                    ['╰', '╭', '─'].includes(line[line.length - 6])
                        ? line
                              .slice(line.length - 11, line.length)
                              .match(/\x1B\[\d+m/g) || ['', '']
                        : ['', ''];
                return `│${line.slice(0, line.length - 1)}${colors[0]}┤${
                    colors[1]
                }`;
            })
            .join('\n');
        response = `${xAxisTop}\n${response}\n${xAxisBottom}`;
    }
    response += `\n${country}: ${casesString}${recoveredString}${deathsString}in the last ${days} days (${formatDate(
        startDate,
    )}-${formatDate(currentDate)} UTC)\n`;
    return response;
};
