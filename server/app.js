const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const formidable = require('formidable')
const shortuuid = require('short-uuid')
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
		res.status(200).json({code: 200, data: {username: user.username}, msg: '获取到用户信息'})
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

/**
 * 图片上传接口
 * @return 图片 uuid 值
 * @description 返回的 uuid 值存到 post 表中的 image 字段里。
 *  访问服务器地址 (BASE_URL) + '/static/image/[uuid].[type]' 即可拿到图片
 */
app.post('/imgUpload', async (req, res) => {
	const form = new formidable.IncomingForm()
	const uuid = shortuuid.generate()
	form.parse(req)

	form.on('fileBegin', function (name, file) {
		const type = file.name.split('.').slice(-1)
		file.path = 'static/image/' + `${uuid}.${type}`
	})

	form.on('file', () => {
		res.status(200).json({
			code: 200,
			msg: '上传图片成功',
			data: {uuid: uuid}
		})
	})
})


app.listen(port, () => console.log(`> Running on localhost:${port}`))
