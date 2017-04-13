var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // Where to start
  entry: {
    TagInput: path.resolve(__dirname, '../../src/TagInput.js')
  },

  // Where to output
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
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
    preLoaders: [{
      test: /\.(jsx?|es6)$/,
      exclude: /(node_modules|dist)/,
      include: /src\/.*/,
      loader: 'eslint'
    }],
    loaders: [
      // ES6/JSX for App
      {
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      // ES6/JSX for App
      {
        test: /\.(jsx?|es6)$/,
        include: [
          /ship-components-.*\/src/
        ],
        loader: 'babel'
      },
      // CSS Modules
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]--[local]!postcss-loader'
        )
      }
    ]
  },

  eslint: {
    // Strict linting enforcing
    failOnWarning: true
  },

  // CSS Modules
  postcss: [
    require('postcss-nested'),
    require('postcss-simple-vars')({
      /**
       * Default variables. Should be overridden in mail build system
       * @type {Object}
       */
      variables: {
        'primary-color' : '#38b889',
        'opacity-disabled': '0.58',
        'base-grid-size' : '4px'
      }
    }),
    require('postcss-color-hex-alpha'),
    require('postcss-color-function'),
    require('postcss-calc'),
    require('autoprefixer')
  ],

  stats: {
    children: false,
    colors: true,
    modules: false,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.es6'],
    fallback: path.resolve(__dirname, '../../node_modules')
  },

  resolveLoader: {
    fallback: path.resolve(__dirname, '../../node_modules')
  },

  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ],

  devtool: 'source-map'
};
