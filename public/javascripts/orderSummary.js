export default async function summary() {
    const summaryContainer = document.querySelector('#summary');
    summaryContainer.innerHTML = '';

    const header = document.createElement('h3');
    header.innerHTML = 'Auto-generated summary:';
    summaryContainer.appendChild(header);
    
    let response = await fetch('/orders/summary/' + window.orderNumber);
    let parsed = await response.json();

    const summary = document.createElement('p');
    summary.innerHTML = parsed.summary;
    summaryContainer.appendChild(summary);

    console.log(parsed);
}