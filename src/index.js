import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';

import TagContainer from './TagContainer';

export default class TagInput extends React.Component {
  constructor() {
    super();
    this.state = {
      selection: new Immutable.List()
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
    selection = selection.push(item);

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
    let { selection } = this.state;
    const selectItemBy = item.key ? 'key' : 'id';
    const index = selection.findIndex(selectedItem => item[selectItemBy] === selectedItem[selectItemBy]);

    if (index > -1) {
      selection = selection.splice(index, 1);
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
  loading:              false,
  multiple:             true,
  filterable:            true,
  darkTheme:            false,

  className:            '',
  orderOptionsBy:       'title',
  label:                'Select Tags...',
  togglePosition:       'left',
  noOptionsMessage:     '',
  toggleSwitchStyle:    'search',

  optionGroupTitles:    []
};

// prop types checking
TagInput.propTypes = {
  loading:            PropTypes.bool,
  multiple:           PropTypes.bool,
  filterable:          PropTypes.bool,
  darkTheme:          PropTypes.bool,

  className:          PropTypes.string,
  orderOptionsBy:     PropTypes.string,
  label:              PropTypes.string,
  togglePosition:     PropTypes.string,
  noOptionsMessage:   PropTypes.string,
  toggleSwitchStyle:  PropTypes.string,

  options:            PropTypes.array.isRequired,
  optionGroupTitles:  PropTypes.array,

  onChange:           PropTypes.func.isRequired
};
