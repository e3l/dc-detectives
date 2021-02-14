export default async function loadSchedulePreview() {
    const previewContainer = document.querySelector('#schedulePreview');
    previewContainer.innerHTML = '';

    const description = document.createElement('h2');
    description.id = 'upto';
    description.innerHTML = 'What is the President up to?';
    previewContainer.appendChild(description);

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

    // find out what most recently passed on the calendar (that's what prez is doing)
    let currentEvent = past[0];
    let currentDescription = document.createElement('h3');
    currentDescription.id = 'current';
    currentDescription.innerHTML = currentEvent.details;
    previewContainer.appendChild(currentDescription);

    // find out what the pres about to do

    // find what the pres did
    const pastEvents = document.createElement('h2');
    pastEvents.innerHTML = 'Recent events:';
    previewContainer.appendChild(pastEvents);

    const LOAD_PAST_ITEMS = 3;
    past.slice(2, LOAD_PAST_ITEMS + 2).forEach((item) => {
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

        previewContainer.appendChild(scheduleItem);
    });
}