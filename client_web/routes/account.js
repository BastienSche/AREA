const express = require('express');
const apiHelper = require('../helpers/api.helper');
const account = express.Router();

account.get('/', (req, res) => {
    res.render('account/index', {pageTitle: "Personal Information"});
});

account.get('/changePassword', (req, res) => {
    res.render('account/change-password', {pageTitle: "Change Password"});
});

account.get('/addArea', async(req, res) => {
    var json = await apiHelper.request('/services', 'GET', '');
    res.render('account/add-area', {pageTitle: "Add Area", actions: json.actions, reactions: json.reactions});
});

module.exports = account;