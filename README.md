# ship-components-tag-input

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) Material Design React Multi-Select Box. Exports a commonjs module that can be used with [webpack](http://webpack.github.io/). Source is in ES6 and an ES5 version is available using [Babel](https://babeljs.io/).

[![npm](https://img.shields.io/npm/v/ship-components-utility.svg?maxAge=2592000)](https://www.npmjs.com/package/ship-components-tag-input)
[![Build Status](http://img.shields.io/travis/ship-components/ship-components-tag-input/master.svg?style=flat)](https://travis-ci.org/ship-components/ship-components-tag-input)
[![Coverage](http://img.shields.io/coveralls/ship-components/ship-components-tag-input.svg?style=flat)](https://coveralls.io/github/ship-components/ship-components-tag-input)
[![devDependencies](https://img.shields.io/david/dev/ship-components/ship-components-tag-input.svg?style=flat)](https://david-dm.org/ship-components/ship-components-tag-input?type=dev)

## Docs & Help

* [Docs](#docs)
* [Usage](#usage)
* [Development](#development)
* [Webpack Configuration](#webpack-configuration)
* [Tests](#tests)
* [History](#history)

Here is the list of options you can use.

* [Filterable](#filterable)
* [DarkTheme](#darkTheme)
* [OrderOptionsBy](#orderOptionsBy)
* [Placeholder](#placeholder)
* [TogglePosition](#togglePosition)
* [NoOptionsMessage](#noOptionsMessage)
* [ToggleSwitchStyle](#toggleSwitchStyle)

## Docs
#### Filterable
{bool}
True by default. Enables an option to let user search inside the text input for a match.

#### DarkTheme
{bool}
False by default.

#### OrderOptionsBy
{string}
'titles' by default. User can pass a prop to order the dropdown result list based on that prop. For instance if your option object looks like:
```js
options = {
  id: 1,
  title: 'Option 1'
}
<!-- User can pass 'id' to order by id or 'title' to order by titles  -->
```

#### TogglePosition
{string}
'left' by default.

#### NoOptionsMessage
{string}
empty by default.

#### ToggleSwitchStyle
{string}
'search' by default. Please refer to [ship-components-icon](https://github.com/ship-components/ship-components-icon) for the list of icons you can pass in.

## Usage

### ES6/JSX (Recommended)
The component is written using ES6/JSX therefore Babel is recommended to use it. The below example is based on using [webpack](http://webpack.github.io/) and [babel-loader](https://github.com/babel/babel-loader).
```js
import React from 'react';
import TagInput from 'ship-components-tag-input';

export default class ExampleClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    };

    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleDeselectItem = this.handleDeselectItem.bind(this);
  }

  handleSelectItem(event) {
    this.setState({
      tags: event.target.value
    });
  }

  handleDeselectItem(event) {
    this.setState({
      tags: event.target.value
    });
  }

  render() {
    const options = [
      {
        id: 3,
        title: 'Option 1',
        searchString: 'Option 1'
      },
      {
        id: 2,
        title: 'Option 2',
        searchString: 'Option 2'
      },
      {
        id: 1,
        title: 'Option 3',
        searchString: 'Option 3'
      }
    ];

    return (
      <div className='form-group'>
        <TagInput
          filterable                                     // True by default
          darkTheme                                     // False by default
          orderOptionsBy='id'                           // 'titles' by default
          placeholder='Choose Tag Inputs'               // 'Select...' by default
          togglePosition='right'                        // 'left' by default
          noOptionsMessage='There are no more tags...'  // '' by default
          toggleSwitchStyle='library_add'               // 'search' by default

          onSelect={this.handleSelectItem}              // REQUIRED
          onDeselect={this.handleDeselectItem}          // REQUIRED
        />
      </div>
    );
  }
}
```

## Development
More examples can be found in the `examples/` folder. A development server can be run with:

```shell
$ git clone https://github.com/ship-components/ship-components-tag-input.git
$ npm install
$ npm test
```
which will live reload any changes you make and serve them at http://localhost:8080.

### Webpack Configuration
This module is designed to be used with webpack but requires a few loaders if you are pulling the source into another project.

```shell
$ npm install autoprefixer babel-core babel-eslint babel-loader babel-plugin-transform-runtime babel-preset-env babel-preset-react coveralls css-loader eslint eslint-config-ship-components eslint-loader eslint-plugin-react extract-text-webpack-plugin file-loader grunt grunt-contrib-clean grunt-coveralls grunt-eslint grunt-webpack jest jest-css-modules lodash object-assign package-banner postcss-calc postcss-color-function postcss-color-hex-alpha postcss-loader postcss-nested postcss-simple-vars prop-types react-addons-test-utils sockjs-client style-loader webpack webpack-dev-server --save-dev
```

Below are is a sample of how to setup the loaders in webpack 3:

```js
/**
 * Relevant Webpack Configuration
 */
{
  [...]
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
                      'base-grid-size': '4px'
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
  [...]
}
```

## Tests
[Incomplete]: Will ve added in v0.3.0 (Soon).

1. `npm install`
2. `npm test`

## History
* 0.2.0 - Initial

## License
The MIT License (MIT)

Copyright (c) 2017 Sepand Assadi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
