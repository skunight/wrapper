import log4js from 'koa-log4'
import Commons from './../utils/commons'
let config,logger
try {
  config = Commons.getConfig('log')
  log4js.configure(config)
} catch (e) {
  console.log('日志配置文件错误')
  process.exit(0)
}
export default log4js