const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')

const db = require('./db/db')
const app = express()
const port = 8084

app.use(compression())
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.static(__dirname + '/'))

app.get('*.js', function (req, res, next) {
	req.url = req.url + '.gz'
	res.set('Content-Encoding', 'gzip')
	next()
})

function callProc(sql, params, res, cb) {
	db.procedureSQL(sql, JSON.stringify(params), (err, ret) => {
		if (err) {
			res.status(500).json({code: -1, msg: '提交请求失败，请联系管理员！', data: null})
		} else {
			cb(ret)
		}
	})
}

/**
 * 测试接口
 */
app.get('/test', async function (req, res) {
	res.status(200).json({code: 200, data: {}, msg: '接口测试成功'})
})


/**
 * 登录
*/
app.post('/login', async function (req, res) {
	let sql = `CALL PROC_USER_LOGIN(?)`
	const params = req.body
	console.log(params)
	callProc(sql, params, res, (r) => {
		res.status(200).json({code: 200, data: r[0], msg: '获取到用户信息'})
	})
})

app.post('/login2', async function (req, res) {
	let sql = `CALL PROC_USER_LOGIN(?)`
	const params = req.body

	console.log(params)
	
	callProc(sql, params, res, (r) => {
		if (r[0] && params.password === r[0].password) {
			res.status(200).json({code: 200, data: r[0], msg: '获取到用户信息'})
		} else {
			res.status(200).json({code: 0, data: {}, msg: '用户名或密码错误'})
		}
	})
})

app.listen(port, () => console.log(`> Running on localhost:${port}`))
