/**
 * Webpack
 *
 * ---------------------------------------------------------------
 *
 * Module loader, JSX transform, Minification, Sourcemaps
 *
 * For usage docs see:
 *    https://github.com/webpack/grunt-webpack
 */

  const webpack = require('webpack');
  const path = require('path');
  const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(grunt) {

  /** **************************************************************************
   * Build
   */
  var buildOptions = Object.assign({}, require('./webpack.config'), {
    // Clear default plugins so we can override through grunt
    plugins: []
  });

  grunt.config.set('webpack', {
    options: buildOptions,

    dev: {
      plugins: [
        new ExtractTextPlugin({
          filename: '[name].css',
          disable: false,
          allChunks: true
        })
      ]
    },

    dist: {
      output: {
        filename: '[name].min.js'
      },

      plugins: [
        new ExtractTextPlugin({
          filename: '[name].min.css',
          disable: false,
          allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin()
      ]
    }
  });

  /** **************************************************************************
   * Development Server
   */
  const serverOptions = Object.assign({}, require('./webpack.config'), {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          context: __dirname,
          eslint: {
            failOnWarning: false
          }
        }
      }),
      new ExtractTextPlugin({
        filename: '[name].css',
        disable: false,
        allChunks: true
      })
    ],
    entry: {
      bundle: path.resolve(__dirname, '../../examples/index.jsx')
    },
    output: {
      filename: 'bundle.js'
    },
    devtool: 'eval',
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-addons-css-transition-group': 'React.addons.CSSTransitionGroup'
    }
  });

  // Remove Extract Plugin. Gotta clone to prevent changing above config
  serverOptions.module = Object.assign({}, serverOptions.module);
  serverOptions.module.rules = serverOptions.module.rules.slice(0);
  serverOptions.module.rules.splice(serverOptions.module.rules.length - 1);
  serverOptions.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[name]--[local]'
        }
      },
      {
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
  });

  // Include any npm modules we need to use babel on here
  serverOptions.module.rules.push({
    test: /\.(jsx?|es6)$/,
    include: [
      path.join(__dirname, '../../node_modules/ship-components-outsideclick'),
      path.join(__dirname, '../../node_modules/ship-components-icon')
    ],
    use: 'babel-loader'
  });

  grunt.config.set('webpack-dev-server', {
    options: {
      webpack: serverOptions,
      host: 'localhost',
      contentBase: 'examples/',
      publicPath: '/',
      filename: 'bundle.js',
      keepalive: true,
      inline: true,
      hot: true,
      quiet: false,
      noInfo: false
    },

    dev: {}
  });

  grunt.loadNpmTasks('grunt-webpack');
};
