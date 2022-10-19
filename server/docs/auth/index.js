const logIn = require('./login');
const refreshToken = require('./refresh.token');

module.exports = {
    '/auth/login': {
        ...logIn
    },
    '/auth/refreshToken': {
        ...refreshToken
    }
}