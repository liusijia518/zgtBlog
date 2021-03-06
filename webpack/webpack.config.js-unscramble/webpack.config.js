const path = require('path');
const HtmlWebpackPlugins = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  plugins: [
    // 清除dist文件夹
    new CleanWebpackPlugin(['dist']),
    // 生成新的html，并将生成的script，css导入（由于文件名一般会加入hash，所以手动写不太可能）
    new HtmlWebpackPlugins({
      title: 'output by HtmlWebpackPlugins'
    }),
    // 模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一。它允许在运行时更新各种模块
    new webpack.HotModuleReplacementPlugin()
  ],
  // source-map,将编译后的代码映射到原代码，便于报错后定位错误
  devtool: 'inline-source-map',
  // webpack-dev-server配置，相当于webpack的watch模块加了个浏览器刷新功能，更改后自动编译并刷新浏览器
  devServer: {
    contentBase: './dist',
    // 结合webpack提供的模块热替换功能
    hot: true
  },
  // 你需要设置开发模式(development mode)，来确保 bundle 是压缩过的(minified)
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
   module: {
     rules: [
       {
         test: /\.css$/,
         use: [
          { loader: 'style-loader' },
          {
              loader: 'css-loader',
              options: {
                  modules: true,
                  localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
          },
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jfif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash:5].[ext]',
              outputPath: 'image/'
            }
          }
        ]
      }
     ]
   }
};