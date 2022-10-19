const getUsers = require('./get.users');
const getUser = require('./get.user');
const createUser = require('./create.user');
const updateUser = require('./update.user');
const updateUserInfo = require('./update.user.info');
const updateUserProvider = require('./update.user.provider');
const updateUserPassword = require('./update.user.password');
const deleteUser = require('./delete.user');

module.exports = {
    '/users': {
        ...getUsers,
        ...createUser
    },
    '/users/{id}': {
        ...getUser,
        ...updateUser,
        ...deleteUser
    },
    '/users/{id}/updatePersonalInfo': {
        ...updateUserInfo
    },
    '/users/{id}/updatePassword': {
        ...updateUserPassword
    },
    '/users/{id}/updateProvider': {
        ...updateUserProvider
    }
}