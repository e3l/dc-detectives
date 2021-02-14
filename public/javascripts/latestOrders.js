export default async function loadLatestOrders() {
    const latestOrdersContainer = document.querySelector('#latestOrders');
    latestOrdersContainer.innerHTML = '';

    const description = document.createElement('h2');
    description.innerHTML = 'Latest executive orders:'
    latestOrdersContainer.appendChild(description);

    let response = await fetch('orders/latest');
    let latestOrders = await response.json();
    latestOrders = latestOrders.latestOrders;

    latestOrders.results.forEach((order) => {
        const orderDiv = document.createElement('div');

        const title = document.createElement('h2');
        title.innerHTML = order.title;
        orderDiv.appendChild(title);
        
        const date = document.createElement('div');
        var dateArray = order.publication_date.split("-");
        const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var dateString = months[dateArray[1]-1] + " " + dateArray[2] + ", " + dateArray[0];
        date.innerHTML = dateString;
        orderDiv.appendChild(date);

        const learnMore = document.createElement('a');
        learnMore.href = '/orders/' + order.document_number;
        learnMore.innerHTML = 'Learn More';
        orderDiv.appendChild(learnMore);

        latestOrdersContainer.appendChild(orderDiv);
    });
}