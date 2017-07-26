const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './client/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: __dirname,
        options: {
          presets: [ 'react-hmre' ]
        }
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader', // 'css-loader?modules&localIdentName=[name]_[local]_[hash:base64:3]',
        ]
      },
    ]
  },
}
