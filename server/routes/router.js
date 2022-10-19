const express = require('express');
const router = express.Router();
const ApiRouter = require('./api/api.route.js');
const middleware = require('../helpers/middleware');
const serviceModel = require('../helpers/service.helper');

router.use('/api/v1', ApiRouter);

router.get('/about.json', async(req, res) => {
    var timestamp = Math.round(+new Date()/1000);
    res.json({
        "client": {
            "host": `${req.connection.remoteAddress}`
        },
        "server": {
            "current_time": timestamp,
            "services": await serviceModel.getAll()
        }
    });
})

router.use(middleware.errorHandler);

module.exports = router;