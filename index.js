import  axios from 'axios';
import asciichart from 'asciichart';

const getData = async () => {
    const data = (await axios.get("https://disease.sh/v3/covid-19/historical/US?lastdays=30")).data;
    console.log(asciichart.plot([
        Object.values(data.timeline.deaths),
    ], {
        height: 20,
        colors: [
            asciichart.red,
        ]
    }));
    console.log('Deaths in 30 days');
    console.log('');
    console.log(asciichart.plot([
        Object.values(data.timeline.cases),
        Object.values(data.timeline.recovered),
    ], {
        height: 25,
        colors: [
            asciichart.blue,
            asciichart.green,
        ]
    }));
    console.log('Cases (blue) and Recovered (Green) in last 30 days');
};

getData();
