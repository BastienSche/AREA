module.exports = {
    servers: [
        {
            url: `http://localhost:${process.env.SRV_PORT}/api/v1`,
            description: "Local REST API", 
            basePath: '/api/v1'
        }
    ]
}