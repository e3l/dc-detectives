const register = require('../lib/register');

var express = require('express');
var router = express.Router();

router.get('/latest/:amount?', async function (req, res, next) {
    let amount = req.params.amount;

    amount = !amount ? 8 : amount;

    res.send({ latestOrders: await register.getLatestExecutiveOrders(amount) });
});

router.get('/:number', async function (req, res, next) {
    let orderNumber = req.params.number;
    res.render('order', { order: await register.getExecutiveOrder(orderNumber) });
});

module.exports = router;