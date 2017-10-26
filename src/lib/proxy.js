import Commons from './../utils/commons'
import request from 'request'
import crypto from 'crypto'
const PassThrough = require('stream').PassThrough
const config = Commons.getConfig('config').api
export default function proxy(){
  return async (ctx,next) => {
    if (ctx.request.path.match(/\/api\//)) {
      const timestamp = Date.now()
      const path = ctx.request.path.replace(/api/, 'erp')
      const option = {
        url: `http://${config.host}:${config.port}${path}`,
        method: ctx.method,
        qs: ctx.query,
        gzip: true,
        timeout: 20000,
        headers: {
          'User-Agent': ctx.get('User-Agent'),
          'X-Forwarded-For': ctx.ip,
          code: config.name,
          timestamp: timestamp,
          sign: sign(path, ctx.method, config.key, timestamp)
        },
        json: true,
        body: ctx.request.body,
      }
      ctx.body = request(option)
        .on('response', (response) => {
          const header = response.headers
          delete header['content-encoding']
          ctx.set(header)
        })
        .on('error', (err) => ctx.onerror(err))
        .pipe(PassThrough())
    } else {
      await next()
    }
  }
}

function sign (path,method,key,timestamp) {
  console.log('path,method,key,timestamp: ', path,method,key,timestamp)
  const hmac = crypto.createHmac('sha256', key)
  let signStr = [path,method,key,timestamp].join(':')
  return hmac.update(signStr).digest('hex')
}