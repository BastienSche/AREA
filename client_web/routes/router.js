const path = require('path');
const express = require('express');
const passport = require('passport');
const router = express.Router();

const middleware = require('../helpers/middleware.js');
const authController = require('../controllers/auth.controller');
const accountRouter = require('./account');
const adminRouter = require('./admin');
const apiHelper = require('../helpers/api.helper.js');

router.get('/auth',  middleware.isLoggedOut, (req, res) => {
    res.render('auth', { pageTitle: "Authentification" });
});
router.post('/auth/register',  middleware.isLoggedOut, authController.register);
router.post('/auth/login',  middleware.isLoggedOut, authController.login);
router.get('/auth/logout', middleware.isLoggedIn, authController.logout);

router.get('/oauth/discord', passport.authenticate('discord'));
router.get('/oauth/discord/callback', authController.discordCallback);
router.get('/oauth/facebook', passport.authenticate('facebook'));
router.get('/oauth/facebook/callback', authController.facebookCallback);

router.use('/admin', middleware.isLoggedIn, middleware.isAdminUser, adminRouter);
router.use('/account', middleware.isLoggedIn, accountRouter);

router.get('/area', middleware.isLoggedIn, async(req, res) => {
    var json = await apiHelper.request(`/users/${res.locals.user.id}/area`, 'GET', res.locals.user.accessToken);
    res.render('area', { pageTitle: "Home", area: json.area });
});

router.get('/client.apk', (req, res) => {
    res.download("/clishared/client.apk");
})

router.get('*', (req, res) => {
    req.flash('error', "This page doesn't exist, you are redirected !");
    res.redirect('/auth');
})

module.exports = router;