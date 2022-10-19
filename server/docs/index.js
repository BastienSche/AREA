
const swagger = require('./swagger');
const components = require('./components');
const tags = require('./tags');
const users = require('./users');
const auth = require('./auth');
const area = require('./area');

module.exports = {
    ...swagger,
    ...components,
    ...tags,
    paths: {
        ...users,
        ...auth,
        ...area
    }
};