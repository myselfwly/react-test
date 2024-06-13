//webpack.dev.js
const base = require('./webpack.base'); //取出公共部分
const { merge } = require('webpack-merge');
const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = merge(base, {
  mode: 'development', //开发环境webpack内置优化
  devtool: 'inline-source-map', //控制台调试代码
  devServer: {
    client: {
      progress: true //在浏览器中以百分比显示编译进度。
    },
    compress: false, //gzip压缩
    hot: true, //热更新
    open: {
      app: {
        name: 'goole-chrome', //走动打开chrome
        arguments: ['--incognito', '--new-window'] //无痕，新的窗口
      }
    },
    port: 8081, //监听端口
    proxy: {} //代理配置
  },
  optimization: {
    //优化模式
    minimize: false
  },
  /**
   * 路径别名
   */

});
