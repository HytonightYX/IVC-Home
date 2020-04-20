const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const formidable = require('formidable')
const shortuuid = require('short-uuid')
const qiniu = require('qiniu')
const app = express()
const port = 7000

const {
  userLogin,
  memberList,
  memberEdit,
  homeImagesList,
  postListSimple,
  postEdit,
  postCreate,
  postDelete,
  postGetFull,
} = require('./db/func')

qiniu.conf.ACCESS_KEY = '25E0vVorHfwQElXxDFiyo3dydVPg7gpmAy7eRjrt'
qiniu.conf.SECRET_KEY = 'gZGcGt_5JWW2OltCOl_cGfnH18VPcLNsHWSK3OoP'

app.use(compression())
app.use(cors())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(express.static(__dirname + '/'))

/**
 * 测试接口
 */
app.get('/test', async function (req, res) {
  res.status(200).json({ code: 200, data: { ok: 1 }, msg: '接口测试成功' })
})

/**
 * 登录接口
 */
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await userLogin(username, password)
    res
      .status(200)
      .json({
        code: 200,
        data: { username: user.username },
        msg: '获取到用户信息'
      })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

/**
 * 获取所有人员信息
 */
app.get('/member', async (req, res) => {
  try {
    const list = await memberList()
    res.status(200).json({ code: 200, data: list, msg: '获取到用户信息' })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

/**
 * 修改人员信息接口
 */
app.post('/member/edit', async (req, res) => {
  const params = req.body
  console.log('收到参数', params)
  try {
    await memberEdit(params)
    const list = await memberList()
    res.status(200).json({ code: 200, data: list, msg: '修改成功' })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

/**
 * 获取所有文章信息列表
 */
app.get('/post/simple', async (req, res) => {
  try {
    const list = await postListSimple()
    res.status(200).json({ code: 200, data: list, msg: '拉取文章列表' })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

/**
 * 添加文章
 */
app.post('/post/create', async (req, res) => {
  const params = req.body
  try {
    await postCreate(params)
    res.status(200).json({ code: 200, data: { ok: 1 }, msg: '新建文章成功' })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

/**
 * 删除文章
 */
app.post('/post/delete', async (req, res) => {
  const params = req.body
  try {
    await postDelete(params)
    const list = await postListSimple()
    res.status(200).json({ code: 200, data: list, msg: '新建文章成功' })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

/**
 * 获取完整文章
 */
app.post('/post/full', async (req, res) => {
  const params = req.body
  try {
    const post = await postGetFull(params)
    res.status(200).json({ code: 200, data: post[0], msg: '新建文章成功' })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

/**
 * 更新文章
 */
app.post('/post/edit', async (req, res) => {
  const params = req.body
  console.log(params)
  try {
    await postEdit(params)
    res.status(200).json({ code: 200, data: { ok: 1 }, msg: '新建文章成功' })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

/**
 * 图片上传接口
 * @return uuid(图片uuid) 和 type(文件后缀)
 * @description 返回的 uuid 存到 post 表中的 image 字段里。
 *  访问服务器地址 (BASE_URL) + '/static/image/[uuid].[type]' 即可拿到图片
 */
app.post('/imgUpload', async (req, res) => {
  const form = new formidable.IncomingForm()
  const uuid = shortuuid.generate()
  let type
  form.parse(req)

  form.on('fileBegin', function (name, file) {
    type = file.name.split('.').slice(-1)
    file.path = 'static/image/' + `${uuid}.${type}`
  })

  form.on('file', () => {
    res.status(200).json({
      code: 200,
      msg: '上传图片成功',
      data: {
        uuid: uuid,
        type
      }
    })
  })
})

// 获取七牛云token
app.post('/qiniutoken', async (req, res) => {
  const bucket = 'noter-v2'

  const getToken = () => {
    const putPolicy = new qiniu.rs.PutPolicy({
      scope: bucket
    })
    return putPolicy.uploadToken()
  }

  try {
    const token = getToken()
    res.status(200).json({ code: 200, data: { token }, msg: '获取token成功' })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

/**
 * 获取所有首页大图url
 */
app.get('/homeimage', async (req, res) => {
  console.log('hello')
  try {
    const list = await homeImagesList()
    res.status(200).json({ code: 200, data: list, msg: '获取首页大图' })
  } catch (e) {
    res.status(200).json({ code: -1, data: {}, msg: e.message })
  }
})

app.listen(port, () => console.log(`> Running on localhost:${port}`))
