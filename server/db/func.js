const mysql = require('mysql2/promise')
const config = require('./conf.js')
const pool = mysql.createPool(config)
const dayjs = require('dayjs')

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
 */
const memberList = async () => {
	return await findMemberAll()
}

/**
 * 更新用户信息
 * @param params 需更新的列表
 */
const memberEdit = async (params) => {
	const setSQL = Object.keys(params).map(item => `${item}="${params[item]}"`)
	const sql = `UPDATE member SET ${setSQL} WHERE id=${params.id}`
	await pool.query(sql)
}

/**
 * 获取所有信息缩略信息
 * 用于首页展示和管理端列表展示（去掉多余的文章详情）
 */
const postListSimple = async () => {
	const [rows, fields] = await pool.query(`SELECT id, title, cover, create_time, status FROM post WHERE del IS NULL ORDER BY create_time DESC`)
	return rows || []
}

/**
 * 添加文章
 */
const postCreate = async (params) => {
	const time = dayjs(Date.now()).format('YYYYMMDDhhmmss')
	const [rows, fields] = await pool.query(`
		INSERT INTO post (cover, title, html, raw, status, create_time) 
		VALUES (?, ?, ?, ?, ?, ?)
	`, [params.cover, params.title, params.html, params.raw, 0, time])
	return rows || []
}

/**
 * 删除文章
 */
const postDelete = async (params) => {
	await pool.query(`UPDATE post SET del = 1 WHERE id=${params.id}`)
}

/**
 * 获取完整文章
 */
const postGetFull = async (params) => {
	const [rows, fields] = await pool.query(`SELECT id, title, cover, raw, html, create_time FROM post WHERE id = ${params.id} AND del IS NULL`)
	if (rows[0]) {
		return rows
	} else {
		throw new Error('找不到该文档')
	}
}

/**
 * 编辑文章
 */
const postEdit = async (params) => {
	const time = dayjs(Date.now()).format('YYYYMMDDhhmmss')
	const sql = `UPDATE post SET title = ?, raw = ?, html = ?, create_time = ? WHERE id = ${params.id}`
	await pool.query(sql, [params.title, params.raw, params.html, time])
}

const homeImagesList = async (params) => {
	const [rows, fields] = await pool.query(`SELECT * FROM home_image`)
	if (rows[0]) {
		return rows
	} else {
		throw new Error('找不到该文档')
	}
}

module.exports = {
	userLogin,
	memberList,
	memberEdit,
	homeImagesList,
	postListSimple,
	postCreate,
	postDelete,
	postGetFull,
	postEdit
}
