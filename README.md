# ship-components-tag-input

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) Material Design React Multi-Select Box. Exports a commonjs module that can be used with [webpack](http://webpack.github.io/). Source is in ES6 and an ES5 version is available using [Babel](https://babeljs.io/).

[![npm](https://img.shields.io/npm/v/ship-components-tag-input.svg?maxAge=2592000)](https://www.npmjs.com/package/ship-components-tag-input)
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
#### filterable
{bool}
True by default. Enables an option to let user search inside the text input for a match.

#### darkTheme
{bool}
False by default.

#### orderOptionsBy
{string}
'titles' by default. User can pass a prop to order the dropdown result list based on that prop. For instance if your option object looks like:
```js
options = {
  id: 1,
  title: 'Option 1'
}
<!-- User can pass 'id' to order by id or 'title' to order by titles  -->
```

#### togglePosition
{string}
'left' by default.

#### noOptionsMessage
{string}
empty by default.

#### toggleSwitchStyle
{string}
'search' by default. Please refer to [ship-components-icon](https://github.com/ship-components/ship-components-icon) for the list of icons you can pass in.


## Usage

### ES6/JSX (Recommended)
The component is written using ES6/JSX therefore Babel is recommended to use it. The below example is based on using [webpack](http://webpack.github.io/) and [babel-loader](https://github.com/babel/babel-loader).
```js
/**
 * ES6 TagInput Example
 */
import React from 'react';
import Immutable from 'immutable';
import TagInput from 'ship-components-tag-input';

export default class ExampleClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: new Immutable.List()

    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(tag) {
    this.setState({
      value: tag
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

          value={this.state.value}
          onChange={this.handleChange}                  // REQUIRED
        />
      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('examples'));
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
This module is designed to be used with webpack. Below are is a sample of how to setup the loaders in webpack 3:

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
* `npm run test`: to run the tests
* `npm run test:update`: to run the tests and update the snapshots
* `npm run test:watchAll`: to run the tests and watch all tests

1. `npm install`
2. `npm test`

## History
* 1.0.4 - Fixes the behavior of the tab key
* 1.0.3 - Fixes the label overlapping the entered filter text on blur.
* 1.0.2 - Fixes the broken input layout due to the `invert` feature
* 1.0.0 - Upgrade to React 16
* 0.7.0 - Feature: prop `invert` to change the component display order
* 0.6.3 - Bugfix: Fixed bug when pressing enter without an option highlighted.
* 0.6.2 - Bugfix: Fixed label position for when selected tags span multiple lines.
* 0.6.1 - Bugfix: Fixed disappearing label when input has value.
* 0.6.0 - Feature: prop function `fetchOptions` for custom ajax on filter input. CSS fix: dropdown requires no extra styling to look like examples.
* 0.5.3 - CSS fix: dropdown can be wider than text input.
* 0.5.0 - Adds unit tests.
* 0.4.3 - Fixes the bug where updating the options in parent component don't change in TagInput component(componentWillReceiveProps).
* 0.4.1 - Fixes bug where Dropdown is not positioned dynamically based on input height.
* 0.4.0 - Adds an option to let use pass in the value as a prop. The state of tags is now handled inside the parent.
* 0.3.0 - Adds a functionality to fetch options from a URL instead of passing options as a prop (Internal use only).
* 0.2.1 - Aligns the component with the rest of ship-components in terms of UI and the functionality.
* 0.1.0 - Initial

## License
The MIT License (MIT)

Copyright (c) 2017 SHIP


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
