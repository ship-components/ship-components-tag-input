import React from 'react';
import PropTypes from 'prop-types';

import TagContainer from './TagContainer';

export default class TagInput extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: []
    };

    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleDeselectItem = this.handleDeselectItem.bind(this);
  }
  /**
   * Selects an item
   * pass it to parent (If any)
   *
   * @param {any} item
   * @memberof TagInput
   */
  handleSelectItem(item) {
    let selection = this.state.selection.slice(0);
    selection.push(item);

    this.setState({
      selection: selection
    }, () => {
      // Sending the tags to parent
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.state.selection);
      }
    });
  }

  /**
   * Deselects an item
   * pass it to parent (If any)
   *
   * @param {any} item
   * @memberof TagInput
   */
  handleDeselectItem(item) {
    const { selection } = this.state;
    const selectItemBy = item.key ? 'key' : 'id';
    const index = selection.findIndex(selectedItem => item[selectItemBy] === selectedItem[selectItemBy]);

    if (index > -1) {
      selection.splice(index, 1);
      this.setState({
        selection: selection
      }, () => {
        // Sending the tags to parent
        if (typeof this.props.onChange === 'function') {
          this.props.onChange(this.state.selection);
        }
      });
    }

    // Sending the tags to parent
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.state.selection);
    }
  }

  render() {
    return (
      <TagContainer
        {...this.props}
        selection={this.state.selection}
        onSelect={this.handleSelectItem}
        onDeselect={this.handleDeselectItem}
      />
    );
  }
}

// default props
TagInput.defaultProps = {
  addItems:             false,
  loading:              false,
  addOptions:           false,
  multiple:             true,
  filterable:            true,
  darkTheme:            false,

  className:            '',
  orderOptionsBy:       'title',
  placeholder:          '',
  label:                'Select Tags...',
  togglePosition:       'left',
  noOptionsMessage:     '',
  toggleSwitchStyle:    'search',

  selection:            [],
  optionGroupTitles:    []
};

// prop types checking
TagInput.propTypes = {
  loading:            PropTypes.bool,
  addOptions:         PropTypes.bool,
  multiple:           PropTypes.bool,
  filterable:          PropTypes.bool,
  darkTheme:          PropTypes.bool,

  className:          PropTypes.string,
  orderOptionsBy:     PropTypes.string,
  placeholder:        PropTypes.string,
  label:              PropTypes.string,
  togglePosition:     PropTypes.string,
  noOptionsMessage:   PropTypes.string,
  toggleSwitchStyle:  PropTypes.string,

  options:            PropTypes.array.isRequired,
  selection:          PropTypes.array,
  optionGroupTitles:  PropTypes.array,

  onChange:           PropTypes.func.isRequired
};
