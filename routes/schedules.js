const execSchedule = require('../lib/execSchedule');

var express = require('express');
var router = express.Router();

router.get('/get/executive', async function(req, res, next) {
    res.send({ schedule: await execSchedule.getExecutiveSchedule() });
});

module.exports = router;