const apiHelper = require('../helpers/api.helper');
const authHelper = require('../helpers/auth.helper');

module.exports = {
    login: async(req, res) => {
        try {
            const { email, password } = req.body;

            if (!email)
                throw new Error('Your email is require for signup.');
            else if (!password)
                throw new Error('Your password is require for login.');

            await authHelper.passportAuthLocal(req, res);
            req.flash('success', `Successfully registered !`);
            res.status(200).redirect('/area');
        } catch(err) {
            console.log("Login FAIL", err.message);
            req.flash('error', err.message);
            res.status(401).redirect('/auth');
        }
    },

    register: async(req, res, next) => {
        try {
            const { firstName, lastName, email, password, passwordCf } = req.body;

            if (!firstName || !lastName)
                throw new Error("Your first or last name seem empty.");
            else if (!email)
                throw new Error("Your email is require for register.");
            else if (!password)
                throw new Error("Your password is require for register.");
            else if (password !== passwordCf)
                throw new Error("The passwords are not equals.");

            var json = await apiHelper.request('/users', 'POST', 'ADMIN_JWT', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });
            await authHelper.passportAuthLocal(req, res);
            req.flash('success', `Successfully registered !`);
            res.status(200).redirect('/area');
        } catch(err) {
            console.log("Register FAIL", err.message);
            req.flash('error', err.message);
            res.status(404).redirect('/auth');
        }
    },

    logout: async(req, res, next) => {
        try {
            req.logOut();
            req.session.destroy(function() {
                res.clearCookie('connect.sid');
                // req.flash('success', `Successfully logout.`);
                res.redirect('/area');
            });
        } catch(err) {
            console.log("Logout FAIL", err);
            req.flash('error', err.message);
            return next(err);
        }
    },

    discordCallback: async(req, res) => {
        try {
            await authHelper.passportAuthDiscord(req, res);
            res.redirect('/account');
        } catch(err) {
            console.log("DiscordCallback FAIL", err);
            req.flash('error', err.message);
            res.redirect('/auth');
        }
    },

    facebookCallback: async(req, res) => {
        try {
            await authHelper.passportAuthFacebook(req, res);
            res.redirect('/account');
        } catch (err) {
            console.log("FacebookCallback FAIL", err);
            req.flash('error', err.message);
            res.redirect('/auth');
        }
    }
}