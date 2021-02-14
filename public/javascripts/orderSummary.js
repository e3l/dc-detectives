export default async function summary() {
    const summaryContainer = document.querySelector('#summary');

    let response = await fetch('/orders/summary/' + window.orderNumber);
    let parsed = await response.json();

    summaryContainer.innerHTML = '';

    const header = document.createElement('h3');
    header.innerHTML = 'Auto-generated summary:';
    summaryContainer.appendChild(header);

    const summary = document.createElement('p');
    summary.innerHTML = parsed.summary;
    summaryContainer.appendChild(summary);

    console.log(parsed);
}