const mysql = require('mysql2/promise')
const config = require('./conf.js')
const pool = mysql.createPool(config)


async function findUser(username) {
	const result = await pool.query('SELECT * FROM user WHERE username = ?', [username])
	if (result[0].length < 1) {
		throw new Error('用户未找到')
	}
	return result[0][0]
}

async function findMemberAll() {
  const result = await pool.query('SELECT * FROM member')
  return result[0] || []
}

/* ===== 下面为业务层代码 ===== */
/**
 * 用户登录
 */
const userLogin = async (username, password) => {
	const userInDB = await findUser(username)
	if (userInDB.password === password) {
		return userInDB
	} else {
	  throw new Error('密码错误')
  }
}

/**
 * 获取所有成员信息
 * @return {Promise<*>}
 */
const memberList = async () => {
  return await findMemberAll()
}

module.exports = {
	userLogin,
  memberList
}
