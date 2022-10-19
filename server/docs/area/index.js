const createArea = require('./create.area');
const getServices = require('./service.area');

module.exports = {
    '/services': {
        ...getServices
    },
    '/area': {
        ...createArea
    },
}