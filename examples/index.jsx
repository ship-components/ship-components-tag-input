/**
 * ES6 Buttons Example
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TagInput from '../src/index';

const Examples = () => {
  const opts = [
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
  const opts2 = [];

  for (var i = 0; i < 40; i++) {
    var obj = {
      id: i + 1,
      title: "Item " + (i + 1),
      searchString: "Optional string " + (i + 1)
    }

    opts2.push(obj);
  }

  return (
    <div>
      <h1>{'<TagInput> Examples'}</h1>
      <div className='example-group'>
        <h2 style={{marginBottom: '20px'}}>Multiple Tags - Available Options</h2>
        <TagInput
          filterable
          orderOptionsBy='id'
          placeholder='Choose Tag Inputs'
          togglePosition='right'
          noOptionsMessage='There are no more tags...'
          toggleSwitchStyle='library_add'
          onChange={() => {}}
          options={opts2}
        />
        <code>
          {`
            <TagInput
              filterable                       // True by default
              darkTheme                       // False by default
              orderOptionsBy='id'             // 'titles' by default
              placeholder='Choose Tag Inputs' // '' by default
              togglePosition='right'          // 'left' by default
              noOptionsMessage='There are no more tags...' // '' by default
              toggleSwitchStyle='library_add' // 'search' by default
              onChange={this.handleChange}    // Required by default
              options={[                      // Required by default
                {
                  id: 3,
                  title: "Item 1",
                  searchString: "Optional string 1"
                },
                {
                  id: 2,
                  title: "Item 2",
                  searchString: "Optional string 2"
                },
                {
                  id: 1,
                  title: "Item 3",
                  searchString: "Optional string 3"
                }
              ]}
            />
          `}
        </code>
        <h2 style={{ marginBottom: '20px' }}>Multiple Tags - Default</h2>
        <TagInput
          options={opts2}
          darkTheme
          placeholder='Choose Tag Inputs'
          onChange={() => { }}
        />
        <code>
          {`<TagInput
              onChange={this.handleChange}    // Required by default
              options={[
                {
                  id: 1,
                  title: "Item 1",
                  searchString: "Optional string 1"
                },
                {
                  id: 2,
                  title: "Item 2",
                  searchString: "Optional string 2"
                },
                {
                  id: 3,
                  title: "Item 3",
                  searchString: "Optional string 3"
                }
              ]}
            />`}
        </code>
        <h2 style={{ marginBottom: '20px' }}>Multiple Tags - Dark Theme</h2>
        <TagInput
          options={opts}
          darkTheme
          placeholder='Choose Tag Inputs'
          onChange={() => { }}
        />
        <code>
          {`
            <TagInput
              darkTheme={true}
              onChange={this.handleChange}    // Required by default
            />
          `}
        </code>
        <h2 style={{ marginBottom: '20px' }}>Multiple Tags - Not Filterable</h2>
        <TagInput
          filterable={false}
          options={opts}
          placeholder='Choose Tag Inputs'
          onChange={() => { }}
        />
        <code>
          {`
            <TagInput
              filterable={false}
              onChange={this.handleChange}    // Required by default
            />
          `}
        </code>
      </div>
    </div>
  );
};

ReactDOM.render(<Examples />, document.getElementById('examples'));
