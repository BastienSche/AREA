module.exports = {
	development: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: "area",
		host: "postgresql",
		dialect: "postgres"
	}
}