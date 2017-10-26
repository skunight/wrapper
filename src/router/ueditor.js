import Router from 'koa-router'
import upyun from 'upyun'
import ueditor from './../utils/ueditor'
import Commons from './../utils/commons'
import Path from 'path'
import moment from 'moment'
const upyunConfig = Commons.getConfig('config').upyun
const router = new Router()
const bucket = new upyun.Bucket(upyunConfig.bucket, upyunConfig.username, upyunConfig.passwd)
const client = new upyun.Client(bucket)

import multer from 'koa-multer'
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    for (let extName of ueditor.imageAllowFiles) {
      if (file.originalname.match(new RegExp(extName))) {
        return cb(null, true)
      }
    }
    return cb(new Error('文件类型错误'))
  },
})

router.all('/ueditor', upload.single('upfile'), async ctx => {
  const file = ctx.req.file
  const { action } = ctx.query
  switch (action) {
    case 'config':
      ctx.body = ueditor
      break
    case 'uploadimage':
    case 'uploadfile':
      try {
        const pathinfo = Path.parse(file.originalname)
        const remotepath = `/${moment().format('YYYY/MM/DD')}/${Commons.uuid()}${pathinfo.ext}`
        const result = await client.putFile(remotepath, file.buffer)
        ctx.body = {
          state: 'SUCCESS',
          url: remotepath,
          type: file.mimetype,
          original: file.originalname,
        }
      } catch (error) {
        console.log(error)
        ctx.states = 500
      }
      break
    default:
      ctx.states = 404
      break
  }
})

export default router