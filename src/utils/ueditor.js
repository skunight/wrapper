export default {
  /* 上传图片配置项 */
  'imageActionName': 'uploadimage', /* 执行上传图片的action名称 */
  'imageFieldName': 'upfile', /* 提交的图片表单名称 */
  'imageMaxSize': 1024000, /* 上传大小限制，单位B */
  'imageAllowFiles': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'], /* 上传图片格式显示 */
  'imageCompressEnable': true, /* 是否压缩图片,默认是true */
  'imageCompressBorder': 1600, /* 图片压缩最长边限制 */
  'imageInsertAlign': 'none', /* 插入的图片浮动方式 */
  'imageUrlPrefix': 'http://xtimg.b0.upaiyun.com', /* 图片访问路径前缀 */
  'imagePathFormat': '/upload/', /* 上传保存路径,可以自定义保存路径和文件名格式 */
}