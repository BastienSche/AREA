const express = require('express');
const api = express.Router();

const AreaError = require('../../helpers/error.helper.js');
const middleware = require('../../helpers/middleware')
const authController = require('../../controllers/auth.controller');
const usersController = require('../../controllers/users.controller');
const areaController = require('../../controllers/area.controller.js');

api.post('/auth/login', authController.login);
api.post('/auth/refreshToken', authController.refreshToken);

api.get('/services', areaController.getAllServices);
api.get('/trigger', areaController.getAllTriggers);
api.get('/users', middleware.verifyAPIToken, usersController.getAll); // WARNN

api.post('/users', usersController.create);

api.get('/users/:param', middleware.verifyAPIToken, middleware.checkAPISelfPerm, usersController.getOne);
api.put('/users/:param', middleware.verifyAPIToken, middleware.verifyAPISecret, usersController.update);

api.patch('/users/:param/updatePersonalInfo', middleware.verifyAPIToken, middleware.checkAPISelfPerm, usersController.updatePersonalInfo);
api.patch('/users/:param/updatePassword', middleware.verifyAPIToken, middleware.checkAPISelfPerm, usersController.updatePassword);
api.patch('/users/:param/updateProvider', middleware.verifyAPIToken, middleware.checkAPISelfPerm, usersController.updateProvider);

api.post('/users/:param/area', middleware.verifyAPIToken, middleware.checkAPISelfPerm, areaController.create);
api.get('/users/:param/area', middleware.verifyAPIToken, middleware.checkAPISelfPerm, areaController.getSelfArea);
api.delete('/users/:param/area', middleware.verifyAPIToken, middleware.checkAPISelfPerm, areaController.remove);
api.patch('/users/:param/area/:areaId/start', middleware.verifyAPIToken, middleware.checkAPISelfPerm, areaController.start);

api.use('*', (req, res) => {
    throw new AreaError('NOT_FOUND', 'Invalid url');
})

module.exports = api;