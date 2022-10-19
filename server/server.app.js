const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Sequelize = require('sequelize');

const router = require('./routes/router.js');
const userHelper = require('./helpers/user.helper');
const serviceHelper = require('./helpers/service.helper');
const trigerHelper = require('./helpers/trigger.helper');

const swaggerUI = require('swagger-ui-express');
const docs = require('./docs');

(async() => {
    const server = express();

    server.use(cors({origin: ['http://localhost:8081',  'http://localhost:8080'] }));
    server.use(bodyParser.json());
    
    server.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
    server.use(router);

    await userHelper.setupAdmin();
    await serviceHelper.setupServices()
    await trigerHelper.enableAllTrigger();

    http.createServer(server).listen(process.env.SRV_PORT, "0.0.0.0", 
        () => console.log(`[SERVER] Start on port ${process.env.SRV_PORT}`
    ));
})()