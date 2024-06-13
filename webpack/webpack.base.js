//webpack.base.js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const devMode = process.env.NODE_ENV !== 'production';
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  target: 'web',
  entry: resolve('../src/index.tsx'), //入口
  plugins: [
    /**
     * html文件处理
     */
    new HtmlWebpackPlugin({
      title: 'Wizard-RUI',
      filename: 'index.html',
      template: resolve('../index.html'),
      hash: true,
      cache: false,
      inject: true,
      minify: {
        removeComments: true,
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript(使用UglifyJS)
        minifyCSS: true // 缩小CSS样式元素和样式属性
      },
      nodeModules: resolve('../node_modules')
    }),
    /**
     * MiniCss插件，在生产环境使用
     */
    !devMode
      ? new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: 'css/[id].[contenthash].css',
        ignoreOrder: true
      })
      : function () { }
  ],
  module: {
    rules: [
      /**
       * 处理less,css 为dev模式下使用style-loader 为pod模式下使用MIniCss
       */
      {
        test: /\.(le|c)ss$/i,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      /**
       * ts,tsx,js,jsx解析
       */
      {
        test: /\.(ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      /**
       * 图片处理
       */
      {
        test: /\.(png|svg|jpg|gif)$/, // 图片
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/images/[name].[ext]' // 存放的位置： dist/assets/images/文件
            }
          }
        ]
      },
      /**
       * 字体文件处理
       */
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/, // 字体
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/fonts/[name].[ext]' // 存放的位置： dist/assets/fonts/文件
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      // "@": ["../src"],
      '@': resolve('../src/'),
      src: resolve('../src/'),
      components: resolve('../src/components'),
      config: resolve('../src/config'),
      hook: resolve('../src/hook'),
      apis: resolve('../src/apis'),
      router: resolve('../src/router'),
      store: resolve('../src/store'),
      theme: resolve('../src/theme'),
      util: resolve('../src/util'),
      i18n: resolve('../src/i18n'),
      assets: resolve('../src/assets'),
      views: resolve('../src/views')
    },
    extensions: ['.tsx', '.ts', '.wasm', '.mjs', '.js', '.json']
  }
};
