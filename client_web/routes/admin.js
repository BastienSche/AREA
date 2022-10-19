const express = require('express');
const account = express.Router();
const apiHelper = require('../helpers/api.helper');

account.get('', (req, res) => {
    res.redirect('/admin/users');
});

account.get('/users', async(req, res) => {
    try {
        var json = await apiHelper.request('/users', 'GET', 'ADMIN_JWT');
        res.render('admin/users', { pageTitle: "List of all Users", users: json.users });
    } catch(err) {
        req.flash('error', err.message);
        res.redirect('/area');
    }
});

account.get('/users/:id', async(req, res) => {
    const { id } = req.params;
    try {
        var json = await apiHelper.request(`/users/${id}`, 'GET', 'ADMIN_JWT');
        res.render('admin/user', { pageTitle: "User Informations", target: json.user });
    } catch(err) {
        req.flash('error', err.message);
        res.redirect('/area');
    }
});

account.get('/widgets', (req, res) => {
    res.render('admin/widgets', { pageTitle: "List of all Widgets" });
});

module.exports = account;