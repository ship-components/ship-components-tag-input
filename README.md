# ship-components-tag-input
[React](http://facebook.github.io/react/) tag input (single, multi, and typeahead). Exports a commonjs module that can be used with [webpack](http://webpack.github.io/). Source is in ES6 and is compiled down to ES5 using [Babel](https://babeljs.io/).

[![npm](https://img.shields.io/npm/v/ship-components-select.svg?maxAge=2592000)](https://www.npmjs.com/package/ship-components-tag-input)

## Usage

### ES6/JSX (Recommended)
The component is written using ES6/JSX therefore Babel is recommended to use it. The below example is based on using [webpack](http://webpack.github.io/) and [babel-loader](https://github.com/babel/babel-loader).
```js
/**
 * ES6 TagInput Example
 */
import React from 'react';
import ReactDOM from 'react-dom';
import TagInput from '../src/TagInput';

class Examples extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: [] 
    };
  }

  handleSelectItem(item) {
    let selection = this.state.selection.slice(0);
    selection.push(item);
    this.setState({
      selection: selection
    });
  }

  handleDeselectItem(item) {
    let selection = this.state.selection.slice(0);
    let index = selection.findIndex(selectedItem => item.key === selectedItem.key);
    if (index > -1) {
      selection.splice(index, 1);
      this.setState({
        selection: selection
      });
    }
  }

  render() {
    const opts = [
      {
        id: 1,
        title: "Option 1"
      },
      {
        id: 2,
        title: "Option 2"
      },
      {
        id: 3,
        title: "Option 3"
      }
    ];

    return (
      <div>
        <h1>{'<TagInput> Examples'}</h1>
        <TagInput
          multiple
          placeholder='Tag input...'
          selection={this.state.selection}
          onSelect={this.handleSelectItem.bind(this)}
          onDeselect={this.handleDeselectItem.bind(this)}
          selection={this.state.selection}
          options={opts}
        />
      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('examples'));
```

## Examples and Development
Examples can be found in the `examples/` folder. A development server can be run with:

```shell
$ npm install
$ npm start
```

which will live reload any changes you make and serve them at http://localhost:8080.

### Webpack Configuration
This module is designed to be used with webpack but requires a few loaders if you are pulling the source into another project.

```shell
$ npm install webpack babel-loader css-loader style-loader postcss-loader extract-text-webpack-plugin postcss-nested postcss-color-hex-alpha postcss-color-function postcss-calc autoprefixer --save-dev
```

Below are is a sample of how to setup the loaders:

```js
/**
 * Relevant Webpack Configuration
 */
{
  [...]
  module: {
    loaders: [
      // Setup support for ES6
      {
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      // Setup support for CSS Modules
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  },
  plugins: [
    // Extract the css and put it in one file. Path is relative to output path
    new ExtractTextPlugin('../css/[name].css', { allChunks: true })
  ],
  // CSS Modules
  postcss: [
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('postcss-color-hex-alpha'),
    require('postcss-color-function'),
    require('postcss-calc'),
    require('autoprefixer')
  ],
  [...]
}
```

## Tests

*There's currently a bug in Jest, so the units tests and they will not run.*

1. `npm install`
2. `npm test`

## History
* 0.1.0 - Initial

## License
The MIT License (MIT)

Copyright (c) 2015 Isaac Suttell

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
