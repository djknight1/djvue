
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  baseUrl: './',
  // 输出文件目录
  outputDir: 'dist',
  // webpack-dev-server 相关配置
  devServer: {
    port: 8888,
  },
}
