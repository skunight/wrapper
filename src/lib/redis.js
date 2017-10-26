import redis from 'redis'
import bluebird from 'bluebird'
import Commons from './../utils/commons'
const config = Commons.getConfig('config').redis
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)
class Redis {
  static client = redis.createClient(config.port, config.host,{
    auth_pass: config.passwd,
    prefix: 'xt:',
  })
}

export default Redis.client
