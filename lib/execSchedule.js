// App that gets the president's schedule

const fetch = require('node-fetch');

async function getExecutiveSchedule() {
    try {
        let response = await fetch(`https://media-cdn.factba.se/rss/json/calendar-full.json`);
        let schedule = await response.json();

        return schedule;
    } catch (e) {
        console.log(e);
        return;
    }
}

module.exports = { getExecutiveSchedule };