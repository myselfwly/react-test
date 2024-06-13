//webpack.prod.js
const base = require('./webpack.base'); //取出公共部分
const { merge } = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const path = require('path');
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = merge(base, {
  mode: 'production', // 环境 development 和 production 环境 链接： https://www.webpackjs.com/concepts/mode/#mode-development
  output: {
    filename: 'index.js', // 文件名
    path: resolve('../dist'), // 文件输出地址
    library: {
      /**
       * 发布运行环境
       * umd——兼容浏览器
       * commonjs,commonjs2,module——node
       * amd——require.js
       * cmd——sea.js
       */
      type: 'umd'
    },
    clean: true
  },
  optimization: {
    //优化模式
    minimize: false
  },
  /**若通过CDN引入React和ReactDOM可以使用 */
  // externals: {
  // 	react: 'React',
  // 	'react-dom': 'ReactDOM'
  // },
  plugins: [new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
});
