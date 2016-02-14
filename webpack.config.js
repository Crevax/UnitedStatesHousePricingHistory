var webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/js/app.js',
    vendors: ['d3']
  },
  output: {
    path: './dist/js/',
    publicPath: '/js/',
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  devServer: {
      historyApiFallback: true
  },
  plugins: [
      new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
          minimize: true})
    ]
}; 