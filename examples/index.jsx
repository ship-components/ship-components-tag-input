/**
 * ES6 Buttons Example
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TagInput from '../src/index';
import Immutable from 'immutable';

export default class Examples extends React.Component {
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
        title: 'Item ' + (i + 1),
        searchString: 'Optional string ' + (i + 1)
      };

      opts2.push(obj);
    }

    return (
      <div>
        <h1>{'<TagInput> Examples'}</h1>
        <div className='example-group'>
          <h2 style={{marginBottom: '20px'}}>Multiple Tags - Available Options</h2>
          <TagInput
            filterable
            orderOptionsBy='title'
            label='Choose Tag Inputs'
            togglePosition='right'
            toggleSwitchStyle='library_add'
            onChange={this.handleChange}
            options={opts2}
            value={this.state.value}
          />
          <code>
{`
  <TagInput
    filterable                      // True by default
    darkTheme                       // False by default
    orderOptionsBy='id'             // 'titles' by default
    label='Select Tags...'          // 'Select Tags...' by default
    togglePosition='right'          // 'left' by default
    noOptionsMessage=''             // '' by default
    toggleSwitchStyle='library_add' // 'search' by default
    onChange={this.handleChange}    // Required by default
    value={this.state.value}        // Immutable.List Required by default
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
            orderOptionsBy='title'
            darkTheme
            label='Choose Tag Inputs...'
            value={this.state.value}
            onChange={this.handleChange}
          />
          <code>
{`
  <TagInput
    onChange={this.handleChange}    // Required by default
    value={this.state.value}        // Immutable.List Required by default
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
            orderOptionsBy='title'
            darkTheme
            label='Choose Tag Inputs'
            value={this.state.value}
            onChange={this.handleChange}
          />
          <code>
{`
  <TagInput
    darkTheme={true}
    value={this.state.value}        // Immutable.List Required by default
    onChange={this.handleChange}    // Required by default
  />
`}
          </code>
          <h2 style={{ marginBottom: '20px' }}>Multiple Tags - Not Filterable</h2>
          <TagInput
            filterable={false}
            orderOptionsBy='title'
            options={opts}
            togglePosition='right'
            value={this.state.value}
            onChange={this.handleChange}
          />
          <code>
{`
  <TagInput
    filterable={false}
    value={this.state.value}        // Immutable.List Required by default
    onChange={this.handleChange}    // Required by default
  />
`}
          </code>
          <h2 style={{ marginBottom: '20px' }}>Multiple Tags - With AutoComplete</h2>
          <TagInput
            label='Choose Tag Inputs...'
            orderOptionsBy='title'
            autoComplete
            fetchUrl={'http://'} // Any url to request the list of options from
            extractor={res => res.data} // data can be changed to anything user wants...
            options={opts2} // Not needed when the autoComplete feature is enabled, only for demo purposes
            togglePosition='right'
            toggleSwitchStyle='library_add'
            value={this.state.value}
            onChange={this.handleChange}
          />
          <code>
{`
  <TagInput
    label='Choose Tag Inputs...'
    autoComplete
    fetchUrl={'http://...'} // Any url to request the list of options from
    extractor={(res) => res.data} // data can be changed to anything user wants...
    togglePosition='right'
    toggleSwitchStyle='library_add'
    value={this.state.value}        // Immutable.List Required by default
    onChange={this.handleChange}
  />`}
          </code>

          <h2 style={{marginBottom: '20px'}}>Stacked Inputs - Maintain Good Spacing</h2>
          <TagInput
            filterable
            orderOptionsBy='title'
            label='Choose Tag Inputs'
            togglePosition='right'
            toggleSwitchStyle='library_add'
            onChange={this.handleChange}
            options={opts2}
            value={this.state.value}
          />
          <TagInput
            filterable
            orderOptionsBy='title'
            label='Choose Tag Inputs'
            togglePosition='right'
            toggleSwitchStyle='library_add'
            onChange={this.handleChange}
            options={opts2}
            value={this.state.value}
          />
          <TagInput
            filterable
            orderOptionsBy='title'
            label='Choose Tag Inputs'
            togglePosition='right'
            toggleSwitchStyle='library_add'
            onChange={this.handleChange}
            options={opts2}
            value={this.state.value}
          />
          <code>
{`
  <TagInput
    filterable                      // True by default
    darkTheme                       // False by default
    orderOptionsBy='id'             // 'titles' by default
    label='Select Tags...'          // 'Select Tags...' by default
    togglePosition='right'          // 'left' by default
    noOptionsMessage=''             // '' by default
    toggleSwitchStyle='library_add' // 'search' by default
    onChange={this.handleChange}    // Required by default
    value={this.state.value}        // Immutable.List Required by default
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
          <h2 style={{ marginBottom: '20px' }}>Multiple Tags - With Invert</h2>
          <TagInput
            label='Choose Tag Inputs...'
            orderOptionsBy='title'
            autoComplete
            fetchUrl={'http://'} // Any url to request the list of options from
            extractor={res => res.data} // data can be changed to anything user wants...
            options={opts2} // Not needed when the autoComplete feature is enabled, only for demo purposes
            togglePosition='right'
            toggleSwitchStyle='library_add'
            value={this.state.value}
            onChange={this.handleChange}
            invert
          />
          <code>
{`
  <TagInput
    label='Choose Tag Inputs...'
    autoComplete
    fetchUrl={'http://...'} // Any url to request the list of options from
    extractor={(res) => res.data} // data can be changed to anything user wants...
    togglePosition='right'
    toggleSwitchStyle='library_add'
    value={this.state.value}        // Immutable.List Required by default
    onChange={this.handleChange}
    invert
  />`}
          </code>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('examples'));
