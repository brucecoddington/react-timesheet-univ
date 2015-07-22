var path = require('path');
var webpack = require('webpack');

module.exports = {
  watch: true,

  entry: [
    "./app/client.js"
  ],

  output: {
    path: __dirname + '/dist/assets/js',
    filename: "app.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'app')
        ],
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    root: [
      path.join(__dirname, "node_modules")
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
