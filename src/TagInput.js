import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Fuse from 'fuse.js';
import cloneDeep from 'lodash.cloneDeep';
import icon from 'ship-components-icon';

import Dropdown from './Dropdown';
import SelectControls from './Controls';

import css from './TagInput.css';

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
export default class TagInput extends React.Component {
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
    this.itemIsHighlighted = this.itemIsHighlighted.bind(this);
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
    this.handleHighlightOption = this.handleHighlightOption.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);

    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.handleSelectNewOption = this.handleSelectNewOption.bind(this);

    this.handleInput = this.handleInput.bind(this);
    this.handleClearItem = this.handleClearItem.bind(this);
  }

  componentDidMount() {
    this.handleDropdownPosition();
    document.addEventListener('click', this.documentClickHandler);
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
   * Save highlighted option from the Dropdown to the SelectBox instance for reference
   */
  handleHighlightOption(option) {
    this.setState({
      highlightedOption: option
    });
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
      this.props.onSelect(cloneDeep(option));
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
   * Handler when user creates (types then selects) a new tag option
   * @param  {Item}  item   the new item
   * @param  {Event} event
   */
  handleSelectNewOption(item) {
    // this references parent VideoPage#ChannelActions since there is no VideoPage#ChannelStore in place
    this.props.onNewItem(item,
      () => {
        this.setState({
          filterText: ''
        });
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
   * Answers "is this item highlighted?"
   * @param  {Item} item
   * @return {bool}
   */
  itemIsHighlighted(item) {
    let key = this.state.highlightedOption ? this.state.highlightedOption.key : '';
    return item.key === key;
  }

  /**
   * Selects the currently highlighted item
   * @param  {Event} event
   */
  selectHighlightedItem(event) {
    let highlightedItem = this.state.highlightedOption;

    if (highlightedItem !== null) {
      if (this.state.newTag && this.state.newTag.key === highlightedItem.key) {
        this.handleSelectNewOption(highlightedItem, event);
      } else {
        this.handleSelectItem(highlightedItem, event);
      }
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
    let fuse = new Fuse(this.props.options, this.props.fuseOptions);
    let results = fuse.search(filterText);

    return results.map(result => Object.assign({}, result.item, {score: result.score}));
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
            let index = this.props.selection.findIndex(selectedOption => selectedOption.key === item.key);
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


  render() {
    let options = this.getVisibleOptions();
    let newTag = this.state.newTag;
    if (options.length === 0 && this.props.addOptions) {
      newTag = {
        title: this.state.filterText,
        key: new Date().getTime() // set temporary item key
      };
    }

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
            [css.empty]:this.state.empty
          },
          css.container,
          this.props.className)}
      >
        <SelectControls
          ref='selectControls'
          isActive={this.state.active}
          isEmpty={this.state.empty}
          loading={this.props.loading}
          toggleSwitch={this.props.toggleSwitch}
          multiple={this.props.multiple}
          selection={this.props.selection}
          filterable={this.props.filterable}
          filterText={this.state.filterText}
          placeholder={this.props.placeholder}
          togglePosition={this.props.togglePosition}
          onToggle={this.handleToggleDropdown}
          onChange={this.handleInput}
          onClear={this.handleClearItem}
          onKeyDown={this.handleKeyboard}
          onFocus={this.handleOpenDropdown}
        />

        <Dropdown
          filterText={this.state.filterText}
          open={this.state.active}
          optionGroupTitles={this.props.optionGroupTitles}
          options={options}
          noOptionsMessage={this.props.noOptionsMessage}
          newOption={newTag}
          highlightedOption={this.state.highlightedOption}
          loading={this.props.loading}
          onHighlight={this.handleHighlightOption}
          onKeyDown={this.handleKeyboard}
          onSelect={this.handleSelectItem}
          onSelectNew={this.handleSelectNewOption}
          style={{top: this.state.dropdownPosTop}}
          togglePosition={this.props.togglePosition}
        />

      </div>
    );
  }
}

// default props
TagInput.defaultProps = {
  addItems:             false,
  loading:              false,
  addOptions:           false,
  multiple:             false,
  filterable:            false,

  className:            '',
  orderOptionsBy:       'title',
  placeholder:          'Select...',
  togglePosition:       'left',
  noOptionsMessage:     '',

  options:              [],
  selection:            [],
  optionGroupTitles:    [],

  toggleSwitch:         <i className={icon.filter_list} />,
  fuseOptions: {
    include:            ['score'],
    keys:               ['searchString', 'title'],
    distance:           40,
    location:           0
  },
  transitionDelay:      250
};

// prop types checking
TagInput.propTypes = {
  loading:            PropTypes.bool,
  addOptions:         PropTypes.bool,
  multiple:           PropTypes.bool,
  filterable:          PropTypes.bool,

  className:          PropTypes.string,
  orderOptionsBy:     PropTypes.string,
  placeholder:        PropTypes.string,
  togglePosition:     PropTypes.string,
  noOptionsMessage:   PropTypes.string,

  toggleSwitch:       PropTypes.object,
  fuseOptions:        PropTypes.object,

  options:            PropTypes.array,
  selection:          PropTypes.array,
  optionGroupTitles:  PropTypes.array,

  transitionDelay:    PropTypes.number,

  onFilter:           PropTypes.func.isRequired,
  onFocus:            PropTypes.func.isRequired,
  onSelect:           PropTypes.func.isRequired,
  onDeselect:         PropTypes.func.isRequired,
  onEnterKey:         PropTypes.func.isRequired,
  onNewItem:          PropTypes.func.isRequired
};

export function defaultFuseOptions() {
  return {
    include: ['score'],
    keys: ['searchString', 'title'],
    distance: 40,
    location: 0
  };
}
