/**
 * ES6 Buttons Example
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
        title: "Option 1",
        searchString: "Option 1"
      },
      {
        id: 2,
        title: "Option 2",
        searchString: "Option 2"
      },
      {
        id: 3,
        title: "Option 3",
        searchString: "Option 3"
      }
    ];

    return (
      <div>
        <h1>{'<TagInput> Examples'}</h1>
        <div className='example-group'>
          <h2>Multiple Tags</h2>
          <TagInput
            multiple
            filterable
            placeholder='Tag input...'
            selection={this.state.selection}
            onSelect={this.handleSelectItem.bind(this)}
            onDeselect={this.handleDeselectItem.bind(this)}
            selection={this.state.selection}
            options={opts}
          />
          <code>
            {`<TagInput
                multiple
                filterable
                placeholder='Tag input...'
                loading={loadingSelectOptions}
                selection={this.state.selection}
                onFilter={this.handleEntityFilter}
                onSelect={this.handleSelectItem.bind(this)}
                onDeselect={this.handleDeselectItem.bind(this)}
                value={this.state.example3}
                options={[
                  {
                    id: 1
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
        </div>

      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('examples'));
