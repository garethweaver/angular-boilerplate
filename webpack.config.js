const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '/src/')
}

module.exports = {
  devServer: {
    contentBase: PATHS.src,
    hot: true,
    inline: true
  },

  mode: 'development',

  entry: [
    path.join(PATHS.src, 'entry.js')
  ],

  output: {
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.js', '.sass', '.css']
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        include: [path.resolve(PATHS.src, 'components')],
        use: ['raw-loader', 'sass-loader?indentedSyntax']
      },
      {
        test: /\.sass$/,
        include: [path.resolve(PATHS.src, 'assets/style')],
        use: ['style-loader', 'css-loader', 'sass-loader?indentedSyntax']
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: path.join(PATHS.src, 'index.html') })
  ]
}
