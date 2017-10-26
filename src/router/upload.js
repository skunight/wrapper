import Router from 'koa-router'
import upyun from 'upyun'
import ueditor from './../utils/ueditor'
import Commons from './../utils/commons'
import proxy from './../lib/proxy'
import Path from 'path'
import moment from 'moment'
const router = new Router()
import multer from 'koa-multer'
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  // fileFilter: (req, file, cb) => {
  //   for (let extName of ueditor.imageAllowFiles) {
  //     if (file.originalname.match(new RegExp(extName))) {
  //       return cb(null, true)
  //     }
  //   }
  //   return cb(new Error('文件类型错误'))
  // },
})

router.post('/api/order/namelist/import', upload.single('upfile'), async (ctx,next) => {
  const file = ctx.req.file
  const {token} = ctx.req.body
  console.log('token: ', token)
  ctx.request.body = {
    token: token,
    data: file.buffer.toString('base64'),
  }
  await next()
}, proxy())

export default router