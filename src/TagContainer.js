import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Utils } from 'ship-components-utility';
import icon from 'ship-components-icon';

import Dropdown from './Dropdown';
import SelectControls from './Controls';

import css from './TagContainer.css';

/**
 * Filterable Select Dropdown Component
 *
 *   options should be Array<Object> with object fields:
 *   key
 *   title
 *   body
 *   icon (optional node)
 *   optionGroup (optional string)
 *   className (optional string)
 */
export default class TagContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      active: false,
      empty: this.isEmpty.call(this),
      dropdownPosTop: '53px'
    };

    this.selectHighlightedItem = this.selectHighlightedItem.bind(this);
    this.highlightPreviousItem = this.highlightPreviousItem.bind(this);
    this.highlightNextItem = this.highlightNextItem.bind(this);
    this.handleDropdownPosition = this.handleDropdownPosition.bind(this);
    this.getVisibleOptions = this.getVisibleOptions.bind(this);
    this.handleOpenDropdown = this.handleOpenDropdown.bind(this);
    this.focusInput = this.focusInput.bind(this);
    this.blurInput = this.blurInput.bind(this);
    this.clearItem = this.clearItem.bind(this);
    this.optionWasSelected = this.optionWasSelected.bind(this);
    this.documentClickHandler = this.documentClickHandler.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.handleToggleDropdown = this.handleToggleDropdown.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClearItem = this.handleClearItem.bind(this);
    this._toggleSwitch = this._toggleSwitch.bind(this);
  }

  componentDidMount() {
    this.handleDropdownPosition();
    document.addEventListener('click', this.documentClickHandler);

    this._inputField = this.refs.selectControls.refs.filterInput;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      empty: this.isEmpty(nextProps)
    }, this.handleDropdownPosition);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler);
  }

  /**
   * Toggle the options dropdown
   * @param  {Event} event
   */
  handleToggleDropdown(event) {
    event.preventDefault();
    if (!this.state.active) {
      this.handleOpenDropdown(event);
    } else {
      this.setState({ active: false });
    }
  }

  /**
   * Opens the options dropdown
   */
  handleOpenDropdown(event) {
    if (this.state.active) {
      return;
    }

    this.setState({ active: true },
      () => {
        // time out because of css transitions.
        setTimeout(this.handleDropdownPosition, this.props.transitionDelay);
        this.focusInput();
      });
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(event);
    }
  }

  /**
   * On input, update state: filterText, highlighed item
   * @param  {Event}  event
   */
  handleInput(event) {
    let filterText = event.target.value;

    this.setState({
      filterText: filterText,
      active: true
    }, () => {
      this.handleDropdownPosition();

      if (typeof this.props.onFilter === 'function') {
        this.props.onFilter(filterText, event);
      }
    });
  }

  /**
   * Handler for user choosing an option from dropdown
   * @param  {Item}   option  the target option
   * @param  {Event}  event the click or keyboard event
   */
  handleSelectItem(option, event) {
    event.preventDefault();
    event.stopPropagation();

    if (option === null) {
      return;
    }

    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(Utils.deepCopy(option));
    }

    this.optionWasSelected();
  }

  /**
   * Peripheral tasks to handleSelectItem
   */
  optionWasSelected() {
    this.setState({
      filterText: this.props.multiple ? '' : this.state.filterText,
      empty: false,
      active: false,
      highlightedOption: null
    }, () => {
      this.handleDropdownPosition();

      if (this.props.multiple) {
        this.focusInput();
      }
    });
  }

  /**
   * Remove an item from the selection
   * @param  {Item}   item  the target item
   * @param  {Event}  event
   */
  handleClearItem(item, event) {
    event.preventDefault();
    event.stopPropagation();

    if (typeof this.props.onDeselect === 'function') {
      this.props.onDeselect(item, this.clearItem);
    } else {
      //note: this will not work properly as is. need to manually update state.selection
      this.clearItem();
    }
  }

  /**
   * Peripheral tasks to handleClearitem
   */
  clearItem() {
    this.setState({
      empty: this.props.selection.length === 0
    }, () => {
      this.handleDropdownPosition();

      if (this.props.multiple) {
        this.focusInput();
      }
    });
  }

  /**
   * Keyboard shortcuts (select item, close dropdown)
   */
  handleKeyboard(event) { // eslint-disable-line complexity
    let code = event.keyCode || event.which;
    switch (code) {
    case 13: // enter
      if (!(this.state.highlightedOption && this.state.active) && typeof this.props.onEnterKey === 'function') {
        this.props.onEnterKey(event);
        break;
      }
    case 9: // tab
      event.preventDefault();
      this.selectHighlightedItem(event);
      break;
    case 38: // up
      event.preventDefault();
      if (this.state.active) {
        this.highlightPreviousItem();
      }
      break;
    case 40: // down
      if (!this.state.active) {
        this.setState({
          active: true
        });
      }
      this.highlightNextItem();
      break;
    case 27: // escape
      this.setState({ active: false }, this.blurInput);
      break;
    }
    event.stopPropagation();
  }

  /**
   * Determines the `top` css property for the dropdown
   */
  handleDropdownPosition() {
    let selectBoxHeight = (this.refs.selectBox.offsetHeight) + 'px';

    // compare strings
    if (selectBoxHeight !== this.state.dropdownPosTop) {
      this.setState({ dropdownPosTop: selectBoxHeight });
    }
  }

  /**
   * Selects the currently highlighted item
   * @param  {Event} event
   */
  selectHighlightedItem(event) {
    let highlightedItem = this.state.highlightedOption;

    if (highlightedItem !== null) {
      this.handleSelectItem(highlightedItem, event);
    }
  }

  /**
   * Highlights one item up in dropdown; meant to be triggered by user pressing `up arrow` key.
   */
  highlightPreviousItem() {
    let highlightedOption = this.state.highlightedOption;

    if (!highlightedOption) {
      return;
    }

    let options = this.getVisibleOptions();
    let currentIndex = options.findIndex(option => option.key === highlightedOption.key);

    if (currentIndex === 0) {
      return;
    }
    highlightedOption = options[currentIndex - 1];
    this.setState({
      highlightedOption: highlightedOption
    });
  }

  /**
   * Highlights one item down in dropdown; meant to be triggered by user pressing `down arrow` key.
   */
  highlightNextItem() {
    let highlightedOption = this.state.highlightedOption;
    let options = this.getVisibleOptions();

    if (!highlightedOption) {
      highlightedOption = options[0];
    } else {
      let currentIndex = options.findIndex(option => option.key === highlightedOption.key);

      if (currentIndex === options.length - 1) {
        return;
      }
      highlightedOption = options[currentIndex + 1];
    }
    this.setState({
      highlightedOption: highlightedOption
    });
  }

  /**
   * Focus cursor on filter input
   */
  focusInput() {
    this.refs.selectControls.focusInput();
  }

  blurInput() {
    this.refs.selectControls.blurInput();
  }

  getFilterResults(filterText) {
    const { options, orderOptionsBy } = this.props;
    const regex = new RegExp(filterText, 'i');

    return options.filter((option) => {
      const orderOptionsByType = typeof option[orderOptionsBy];

      if (orderOptionsByType === 'string') {
        return regex.test(option[orderOptionsBy].toLowerCase());
      }

      if (orderOptionsByType === 'number') {
        return option[orderOptionsBy] === Number(filterText);
      }

      // In case searching through an object
      return option[orderOptionsBy].hasOwnProperty(filterText);
    });
  }

  /**
   * Determines what options to show in dropdown
   * @param  {string}       filterText
   * @return {Array<Option>}  options matching `filterText` and not already selected
   */
  getVisibleOptions(filterText) {
    filterText = typeof filterText === 'undefined' ? this.state.filterText : filterText;
    let options = this.props.options;

    // show filtered results
    if (filterText !== '') {
      options = this.getFilterResults(filterText);
    }

    // exclude selected options
    // TODO : its probably better (in single-select cases) to show the selected item in the dropdown with a checkmark, similar to standard <select />
    if (!this.isEmpty()) {
      if (this.props.selection instanceof Array) {
        if (this.props.selection.length > 0) {
          options = options.filter((item) => {
            let selector = item.key ? 'key' : 'id';
            let index = this.props.selection.findIndex(selectedOption => selectedOption[selector] === item[selector]);
            return index < 0;
          });
        }
      } else {
        options = options.filter(item => item.key !== this.props.selection.key);
      }
    }

    /**
     * Sort by:
     * 1 - "optionGroup"
     * 2 - "score" if possible
     * 3 - props.orderOptionsBy field
     */
    return options.sort((a, b) => { // eslint-disable-line complexity
      if (a.optionGroup !== b.optionGroup) {
        return a.optionGroup > b.optionGroup ? 1 : -1;
      }
      if (a.score && b.score && a.score !== b.score) {
        // lower score = closer match (Fuse.js)
        return a.score > b.score ? 1 : -1;
      }
      if (typeof a[this.props.orderOptionsBy] === 'string') {
        return a[this.props.orderOptionsBy].replace(/\s\s+/g,' ').toLowerCase() > b[this.props.orderOptionsBy].replace(/\s\s+/g,' ').toLowerCase() ? 1 : -1;
      }
      return a[this.props.orderOptionsBy] > b[this.props.orderOptionsBy] ? 1 : -1;
    });
  }

  documentClickHandler(event) {
    if (event.defaultPrevented) {
      return;
    }
    this.setState({
      active: false
    });
  }

  isEmpty(props = this.props) {
    if (props.selection instanceof Array) {
      return props.selection.length === 0;
    } else {
      return !props.selection;
    }
  }

  _toggleSwitch() {
    return <i className={classNames(icon[this.props.toggleSwitchStyle], css.toggleBtn)} />;
  }

  render() {
    const toggleSwitch = this._toggleSwitch();
    let options = this.getVisibleOptions();

    return (
      <div
        ref='selectBox'
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        className={classNames(
          {
            [css.active]:this.state.active,
            [css.empty]:this.state.empty,
            [css.darkTheme]: this.props.darkTheme
          },
          css.container,
          this.props.className)}
      >
        <SelectControls
          {...this.props}
          ref='selectControls'
          style={{ top: this.state.dropdownPosTop }}
          isActive={this.state.active}
          isEmpty={this.state.empty}
          filterText={this.state.filterText}
          toggleSwitch={toggleSwitch}
          onToggle={this.handleToggleDropdown}
          onChange={this.handleInput}
          onClear={this.handleClearItem}
          onKeyDown={this.handleKeyboard}
          onFocus={this.handleOpenDropdown}
        />

        <Dropdown
          {...this.props}
          filterText={this.state.filterText}
          open={this.state.active}
          highlightedOption={this.state.highlightedOption}
          options={options}
          onHighlight={this.handleHighlightOption}
          onKeyDown={this.handleKeyboard}
          onSelect={this.handleSelectItem}
        />

      </div>
    );
  }
}

// default props
TagContainer.defaultProps = {
  className:            '',
  transitionDelay:      250,

  onFilter:             function onFilter() {},
  onFocus:              function onFocus() {},
  onEnterKey:           function onEnterKey() {},
  onNewItem:            function onNewItem() {}
};

// prop types checking
TagContainer.propTypes = {
  multiple:           PropTypes.bool.isRequired,
  darkTheme:          PropTypes.bool.isRequired,

  className:          PropTypes.string,
  orderOptionsBy:     PropTypes.string.isRequired,
  placeholder:        PropTypes.string.isRequired,
  togglePosition:     PropTypes.string.isRequired,
  noOptionsMessage:   PropTypes.string.isRequired,
  toggleSwitchStyle:  PropTypes.string.isRequired,

  options:            PropTypes.array.isRequired,
  selection:          PropTypes.array.isRequired,
  optionGroupTitles:  PropTypes.array.isRequired,

  transitionDelay:    PropTypes.number,

  onFilter:           PropTypes.func,
  onFocus:            PropTypes.func,
  onSelect:           PropTypes.func.isRequired,
  onDeselect:         PropTypes.func.isRequired,
  onEnterKey:         PropTypes.func,
  onNewItem:          PropTypes.func
};
