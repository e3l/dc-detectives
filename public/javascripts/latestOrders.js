export default async function loadLatestOrders() {
    const latestOrdersContainer = document.querySelector('#latestOrders');

    let response = await fetch('orders/latest');
    let latestOrders = await response.json();
    latestOrders = latestOrders.latestOrders;
    
    latestOrdersContainer.innerHTML = '';
    
    const description = document.createElement('h2');
    description.innerHTML = 'Latest executive orders:'
    description.id = 'latestLabel';
    latestOrdersContainer.appendChild(description);

    const lineBreak2 = document.createElement('hr');
    latestOrdersContainer.appendChild(lineBreak2);

    latestOrders.results.forEach((order) => {
        const orderDiv = document.createElement('div');

        const title = document.createElement('h2');
        title.innerHTML = order.title;
        orderDiv.appendChild(title);

        console.log(order);

        const publishDate = document.createElement('div');
        var publishDateArray = order.publication_date.split("-");
        const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var publichDateString = 'Published on ' + months[publishDateArray[1] - 1] + " " + publishDateArray[2] + ", " + publishDateArray[0];
        publishDate.innerHTML = publichDateString;
        orderDiv.appendChild(publishDate);

        const learnMore = document.createElement('a');
        learnMore.href = '/orders/' + order.document_number;
        learnMore.innerHTML = 'Learn More >';
        orderDiv.appendChild(learnMore);

        latestOrdersContainer.appendChild(orderDiv);

        const lineBreak2 = document.createElement('hr');
        latestOrdersContainer.appendChild(lineBreak2);
    });
}