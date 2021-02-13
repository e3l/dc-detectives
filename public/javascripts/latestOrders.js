async function loadLatestOrders() {
    const latestOrdersContainer = document.querySelector('#latestOrders');

    let response = await fetch('orders/latest');
    let latestOrders = await response.json();
    latestOrders = latestOrders.latestOrders;

    console.log(latestOrders);

    latestOrders.results.forEach((order) => {
        const orderDiv = document.createElement('div');

        const title = document.createElement('h2');
        title.innerHTML = order.title;
        
        orderDiv.appendChild(title);

        latestOrdersContainer.appendChild(orderDiv);
    });
}

loadLatestOrders();