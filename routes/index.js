var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'DC Detectives' });
});
router.get('/order/:number', function(req, res, next){
  let orderNumber = req.params.number;
  res.render('order', { orderNum: orderNumber});
});

module.exports = router;
