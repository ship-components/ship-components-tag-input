const webpack = require('webpack'),
  path = require('path'),
  ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // Where to start
  entry: {
    TagInput: path.resolve(__dirname, '../../src/index.js')
  },

  // Where to output
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  externals: {
    classnames: true,
    react: 'React',
    'react-dom': true,
    'ship-components-outsideclick': true,
    'ship-components-icon': true,
    'react-addons-css-transition-group': true
  },

  module: {
    rules: [
      {
        test: /\.(jsx?|es6)$/,
        enforce: 'pre',
        exclude: /(node_modules|dist)/,
        include: /src\/.*/,
        use: 'eslint-loader'
      },
      // ES6/JSX for App
      {
        test: /\.(jsx?|es6)$/,
        exclude: [
          /node_modules/
        ],
        use: 'babel-loader'
      },
      {
        test: /\.(jsx?|es6)$/,
        include: [
          /ship-components-.*\/src/
        ],
        use: 'babel-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      // CSS Modules
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]--[local]'
              }
            },
            {
              // CSS Modules
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  require('postcss-nested')(),
                  require('postcss-simple-vars')({
                    /**
                     * Default variables. Should be overridden in mail build system
                     * @type {Object}
                     */
                    variables: {
                      'primary-color': '#38b889',
                      'opacity-disabled': '0.58',
                      'base-grid-size': '4px',
                      'accent-color': '#38b889',
                      'warning-color': '#d43c36',
                      'success-color': '#50a111',
                      'primary-font-color': '#333',
                      'inverse-font-color': '#fff',
                      'primary-background-color': '#fff'
                    }
                  }),
                  require('postcss-color-hex-alpha')(),
                  require('postcss-color-function')(),
                  require('postcss-calc')(),
                  require('autoprefixer')()
                ]
              }
            }
          ]
        })
      }
    ]
  },

  stats: {
    children: false,
    colors: true,
    modules: false,
    reasons: true
  },

  resolve: {
    extensions: ['.js', '.jsx', '.es6'],
    modules: [path.resolve(__dirname, '../../node_modules')]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        eslint: {
          // Strict linting enforcing
          failOnWarning: true
        }
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: false,
      allChunks: true
    })
  ],

  devtool: 'source-map'
};
