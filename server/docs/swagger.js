module.exports = {
	swagger: "2.0",
	info: {
		title: 'AREA REST API',
		version: '1.0.0',
		description: 'Swagger API for AREA Project'
	},
	host: `localhost:${process.env.SRV_PORT}`,
	basePath: '/api/v1',
	schemes: ['http'],
	consumes: ['application/json'],
	produces: ['application/json'],
	securityDefinitions: {
		bearerAuth: {
		    name: 'Authorization',
			in: 'header',
			type: 'apiKey'
		}
	},
	security: [{
		bearerAuth: []
	}]
};