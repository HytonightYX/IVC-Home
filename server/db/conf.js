const conf = {
	host: '101.37.14.191',
	port: 3306,
	database: 'library',
	user: 'libadmin',
	password: require('../secret').mysql_secret,
	multipleStatements: true,
	secret: require('../secret').mysql_secret,
}

module.exports = conf
