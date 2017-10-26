/**
 * Created by zzy at 2016-12-15 12:26
 */
import fs from 'fs-plus'
import path from 'path'
import _ from 'lodash'
import uuid from 'uuid'
import randomstring from 'randomstring'
export default class Commons {
  static getConfig(name) {
    let filePath = path.join(__dirname,`./../../config/${name}.json`)
    if(!fs.existsSync(filePath)){
      throw new Error('config error')
      process.exit(0)
    }
    return require(filePath)
  }

  static randomPasswd(size) {
    return randomstring.generate(size) 
  }


  static base64Encode(str) {
    return Buffer.from(str).toString('base64')
  }

  static base64Decode(str) {
    return Buffer.from(str,'base64').toString()
  }

  static base64EncodeObject(obj) {
    return Commons.base64Encode(JSON.stringify(obj))
  }

  static base64DecodeObject(str) {
    return JSON.parse(Commons.base64Decode(str))
  }

  static uuid() {
    return uuid.v4().replace(/-/g, '')
  }
}
