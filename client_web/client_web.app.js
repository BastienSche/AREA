const express = require('express');
const http = require('http');
const path = require('path');
const fs = require('fs');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const router = require('./routes/router');
const auth = require('./helpers/auth.helper');

const SequelizeStore = require('connect-session-sequelize')(session.Store);
const Sequelize = require("sequelize");

var store = new SequelizeStore({
    db: new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
        host: 'postgresql',
        dialect: 'postgres',
    })    
});

const sessionOptions = {
    secret: process.env.SECRET_KEY,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false },
    store
};

(async() => {
    const web = express();
    web.use('/', express.static(path.join(__dirname, '/public')));
    web.set('views', path.join(__dirname, '/views'));
    web.set('view engine', 'ejs'); 
    web.use(flash());

    web.use(bodyParser.urlencoded({
        extended: true
    }));
    web.use(cookieParser());

    store.sync();
    web.use(session(sessionOptions));
    web.use(passport.initialize());
    web.use(passport.session());
    auth.passportConfigure(passport);

    web.use(async(req, res, next) => {
        res.locals.error = req.flash('error');
        res.locals.success = req.flash('error');
        next();
    });

    web.use(router);

    http.createServer(web).listen(process.env.WEB_PORT, "0.0.0.0", 
        () => console.log(`[CLIENT_WEB] Start on port ${process.env.WEB_PORT}`
    ));
})()