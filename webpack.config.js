var path = require('path');
var webpack = require('webpack');
var host = 'localhost';
var port = 3001;

module.exports = {
  watch: true,
  devServerPort: port,
  devtool: 'inline-source-map',

  entry: [
    'webpack-dev-server/client?http://' + host + ':' + port,
    'webpack/hot/only-dev-server',
    "./app/client.js"
  ],

  output: {
    path: __dirname + '/dist/assets/js',
    filename: "app.js",
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?optional=runtime'],
        include: [
          path.resolve(__dirname, 'app')
        ]
      }
    ]
  },

  resolve: {
    root: [
      path.join(__dirname, "node_modules")
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};
