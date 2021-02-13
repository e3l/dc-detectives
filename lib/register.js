// App that interfaces with the federal register site

const GET_ORDERS_COUNT = 25;

const fetch = require('node-fetch');

function handleErrors(res) {
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res;
}

async function getLatestExecutiveOrders(numOrders) {
    if (!numOrders) numOrders = GET_ORDERS_COUNT;

    try {
        let response = await fetch(`https://www.federalregister.gov/api/v1/documents.json?per_page=${numOrders}&conditions%5Btype%5D%5B%5D=PRESDOCU&conditions%5Bpresidential_document_type%5D%5B%5D=executive_order`);
        let ordersList = await response.json();

        // console.log(ordersList);

        return ordersList;
    } catch (e) {
        console.log(e);
        return;
    }
}

module.exports = { getLatestExecutiveOrders };