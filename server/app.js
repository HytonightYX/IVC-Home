const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const app = express()
const port = 7000

const {userLogin, memberList} = require('./db/func')

app.use(compression())
app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))
app.use(express.static(__dirname + '/'))

/**
 * 测试接口
 */
app.get('/test', async function (req, res) {
	res.status(200).json({code: 200, data: {ok: 1}, msg: '接口测试成功'})
})

/**
 * 登录接口
 */
app.post('/login', async (req, res) => {
	const {username, password} = req.body
	try {
		const user = await userLogin(username, password)
		res.status(200).json({code: 200, data: user, msg: '获取到用户信息'})
	} catch (e) {
		res.status(200).json({code: -1, data: {}, msg: e.message})
	}
})

/**
 * 获取所有人员信息
 */
app.get('/member', async (req, res) => {
	try {
		const list = await memberList()
		res.status(200).json({code: 200, data: list, msg: '获取到用户信息'})
	} catch (e) {
		res.status(200).json({code: -1, data: {}, msg: e.message})
	}
})

app.listen(port, () => console.log(`> Running on localhost:${port}`))
