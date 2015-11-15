var path                  = require('path');
var webpack               = require('webpack');
var HtmlWebpackPlugin     = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var SRC_PATH    = path.join(__dirname, 'src');
var BUILD_PATH  = path.join(__dirname, 'dist');
var HTML_OPTS   = {
  filename: 'popup.html',
  title:    'Maestro'
};

module.exports = {
  quiet:    true,
  context:  SRC_PATH,
  entry:    [path.join(SRC_PATH, 'main.js')],
  resolve:  {
    root:       SRC_PATH,
    extensions: ['', '.js', '.jsx']
  },
  output:   {
    path:       BUILD_PATH,
    filename:   'client.js'
  },
  plugins: [
    new HtmlWebpackPlugin(HTML_OPTS),
    new TransferWebpackPlugin(
      [
        { from: 'chrome', to: '.' }
      ],
      SRC_PATH
    )
  ],
  module:   {
    loaders:  [
      {
        test:     /\.(png)$/,
        loader:   'url-loader?limit=100000'
      },
      {
        test:     /\.scss$/,
        loaders:  ['style', 'css', 'sass?&includePaths[]=' + encodeURIComponent(SRC_PATH)]
      },
      {
        test:     /\.jsx?$/,
        exclude:  /node_modules/,
        loader:   'babel',
        query:    {
          optional: [
            'runtime',
            'es7.asyncFunctions',
            'es7.decorators',
            'es7.classProperties'
          ]
        }
      }
    ]
  }
};
