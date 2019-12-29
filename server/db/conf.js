const conf = {
	host: '101.37.14.191',
	user: 'ivcuser',
	database: 'ivc',
	password: require('../secret').mysql_secret,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}

module.exports = conf
