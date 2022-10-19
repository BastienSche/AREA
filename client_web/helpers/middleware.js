const flash = require('connect-flash');

exports.isLoggedIn = async(req, res, next) => {
    if (await req.isAuthenticated()) {
        res.locals.user = req.session.passport ? req.session.passport.user : null;
        res.locals.isAuthentificated = true;
        return next();
    }
    req.flash('error', 'You must be login for access to this content !');
    return res.redirect('/auth')
}

exports.isLoggedOut = async(req, res, next) => {
    if (!req.isAuthenticated()) {
        res.locals.isAuthentificated = false;
        return next();
    }
    req.flash('error', 'You must be logged out for access to this content !');
    return res.redirect('/area');
}

exports.isAdminUser = async(req, res, next) => {
    if (res.locals.user.role == 'Admin')
        return next();
    req.flash('error', 'You must be an Admin for access to this content !');
    return res.redirect('/area');
}