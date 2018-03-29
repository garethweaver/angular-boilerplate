const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  dist: path.join(__dirname, '/dist/'),
  src: path.join(__dirname, '/src/')
}

module.exports = {
  mode: 'production',

  entry: [
    path.join(PATHS.src, 'entry.js')
  ],

  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.ts', '.js', '.sass', '.css']
  },

  module: {
    rules: [
      {
        test: /\.sass$/,
        include: [path.resolve(PATHS.src, 'components')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', query: { modules: true } },
            { loader: 'sass-loader?indentedSyntax' }
          ],
        })
      },
      {
        test: /\.sass$/,
        include: [path.resolve(PATHS.src, 'assets/style')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader?indentedSyntax'
        })
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    // new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({ template: path.join(PATHS.src, 'index.html') }),
    new webpack.ContextReplacementPlugin(/\@angular(\\|\/)core(\\|\/)esm5/, path.join(__dirname, './client'))
  ]
}
