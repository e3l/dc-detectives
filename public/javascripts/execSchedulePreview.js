export default async function loadSchedulePreview() {
    const scheduleContainer = document.querySelector('#schedulePreview');
    scheduleContainer.innerHTML = '';

    const bottomContainer = document.createElement('div');
    bottomContainer.id = 'scheduleBottom';

    const infoContainer = document.createElement('div');
    infoContainer.id = 'scheduleInfo';

    const description = document.createElement('h2');
    description.id = 'upto';
    description.innerHTML = 'What is the President up to?';
    scheduleContainer.appendChild(description);

    let response = await fetch('/schedules/get/executive');
    let schedule = await response.json();
    schedule = schedule.schedule;

    // sort into before and after right now
    let currentTime = moment();

    let timezoneOffset = moment().isDST() ? ' -04:00' : ' -05:00';

    let past = [];
    let future = [];
    schedule.forEach((item) => {
        if (!item.time) {
            item.time = '00:00:00';
        }

        let itemTime = moment(item.date + ' ' + item.time + timezoneOffset, 'YYYY-MM-DD HH:mm:ss Z');

        if (itemTime.isBefore(currentTime)) {
            past.push(item);
        } else {
            future.push(item);
        }
    });

    // sort past
    past = past.sort((a, b) => new moment(b.date).format('YYYYMMDD') - new moment(a.date).format('YYYYMMDD'));

    // find out what most recently passed on the calendar (that's what prez is doing)
    let currentEvent = past[0];
    let currentDescription = document.createElement('h3');
    currentDescription.id = 'current';
    currentDescription.innerHTML = currentEvent.details;
    scheduleContainer.appendChild(currentDescription);

    // find out what the pres about to do

    // img
    const img = document.createElement('img');
    img.src = 'images/biden.jpg';
    bottomContainer.appendChild(img);

    // find what the pres did
    const pastEvents = document.createElement('h2');
    pastEvents.innerHTML = 'Recent events:';
    pastEvents.id = 'recentLabel';
    infoContainer.appendChild(pastEvents);

    const LOAD_PAST_ITEMS = 3;
    let loaded = 0;
    let tryIndex = 1;
    loadPasts(past);

    function loadPasts(past) {
        let toShow = [];

        while (loaded < LOAD_PAST_ITEMS) {
            let item = past[tryIndex];

            if (item.details == currentEvent.details) {
                tryIndex++;
                continue;
            }

            const scheduleItem = document.createElement('div');
            scheduleItem.id = 'scheduleItem';

            const title = document.createElement('h2');
            title.innerHTML = item.details;
            scheduleItem.appendChild(title);

            if (item.time) {
                const time = document.createElement('p');
                time.innerHTML = item.time + ' ' + item.date;
                scheduleItem.appendChild(time);
            }

            toShow.push(scheduleItem);

            tryIndex++;
            loaded++;
        }

        toShow.slice().reverse().forEach((show) => {
            infoContainer.appendChild(show);
        })
    };

    bottomContainer.appendChild(infoContainer);
    scheduleContainer.appendChild(bottomContainer);

    const link = document.createElement('a');
    link.innerHTML = 'See the President\'s full schedule on Factba.se >';
    link.href = 'https://factba.se/calendar/';
    infoContainer.appendChild(link);
}