import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Tag from './Tag';
import Loader from './Loader';

import css from './Controls.css';

export default class SelectControls extends React.Component {
  constructor(props) {
    super(props);
    this.handleOpenDropdown = this.handleOpenDropdown.bind(this);
  }

  /**
   * Enables the focus on input DOM
   *
   * @memberof SelectControls
   */
  focusInput() {
    if (this.props.filterable) {
      this.refs.filterInput.focus();
    }
  }

  /**
   * Enables the blur on input DOM
   *
   * @memberof SelectControls
   */
  blurInput() {
    if (this.props.filterable) {
      this.refs.filterInput.blur();
    }
  }

  /**
   * Opens the dropdown menu
   *
   * @memberof SelectControls
   */
  handleOpenDropdown() {
    if (this.props.multiple) {
      this.focusInput.call(this);
    }

    this.props.onFocus();
  }

  /**
   * Search / Filter functionality
   *
   * @returns {any} DOM || null
   * @memberof SelectControls
   */
  filterHtml() {
    return this.props.filterable ?
      (
        <input
          ref='filterInput'
          placeholder={this.props.placeholder}
          onKeyDown={this.props.onKeyDown}
          onChange={this.props.onChange}
          value={this.props.filterText}
          className={classNames(css.filter, {
            empty: this.props.isEmpty,
            hidden: !this.props.multiple && !this.props.isActive.array,
            [css.withTags]: this.props.selection.length > 0
          })}
          type='text'
        />
      )
      : null;
  }

  /**
   * Shows the list of options
   *
   * @returns {react}
   * @memberof SelectControls
   */
  selectionDisplayHtml() {
    if (this.props.multiple) {
      return (
        <div
          key={1}
          className={css['multi-selection-area']}
          onClick={this.handleOpenDropdown}
        >
          {this.props.selection
            .map(item => (
              <Tag
                key={`ship-select-tag--${item.key || item[this.props.orderOptionsBy]}`}
                icon={item.icon}
                title={item[this.props.orderOptionsBy]}
                // eslint-disable-next-line react/jsx-no-bind
                onClear={this.props.onClear.bind(this, item)}
              />
            ))
          }
          {this.filterHtml.call(this)}
        </div>
      );
    }

    return (
      <div
        key={1}
        className={css['selection-area']}
        onClick={this.handleOpenDropdown}
      >
        <span
          className={classNames(
            css.selection,
            {
              empty: this.props.isEmpty,
              hidden: (this.props.filterable && this.props.isActive)
            }
          )}
        >
          {this.props.selection ? this.props.selection.title : this.props.placeholder}
        </span>
        {this.filterHtml.call(this)}
      </div>
    );
  }

  /**
   * Shows the toggle button
   *
   * @returns {react}
   * @memberof SelectControls
   */
  dropdownToggleHtml() {
    return (
      <div
        key={0}
        className={css['toggle-container']}
      >
        {this.props.toggleSwitch !== false ?
          <button
            className={classNames(css['toggle-btn'], {
              [css.hidden]: this.props.loading,
              [css.darkTheme]: this.props.darkTheme,
              [css.toggleRightPos]: this.props.togglePosition && this.props.togglePosition === 'right'
            })}
            onClick={this.props.onToggle}
          >
            {this.props.toggleSwitch}
          </button>
          : null}
        <Loader
          visible={this.props.loading}
          className={css.loader}
          spinnerClassName={css['loader-spinner']}
        />
      </div>
    );
  }

  render() {
    let children = [];
    let selectionDisplay = this.selectionDisplayHtml.call(this);
    let toggleBtn = this.dropdownToggleHtml.call(this);

    if (this.props.togglePosition === 'right') {
      children[0] = selectionDisplay;
      children[1] = toggleBtn;
    } else {
      children[0] = toggleBtn;
      children[1] = selectionDisplay;
    }

    return (
      <div className={css.controls}>
        {children}
      </div>
    );
  }
}

// default props
SelectControls.defaultProps = {
  open:          false,
  loading:       false,
  isActive:      false,
  isEmpty:       false,
  multiple:      false,
  filterable:     false,

  filterText:      '',

  toggleSwitch:   [],
  togglePosition: [],
  selection:      []
};

// prop types checking
SelectControls.propTypes = {
  open:           PropTypes.bool,
  loading:        PropTypes.bool,
  isActive:       PropTypes.bool,
  isEmpty:        PropTypes.bool,
  multiple:       PropTypes.bool,
  filterable:      PropTypes.bool,
  darkTheme:      PropTypes.bool.isRequired,

  filterText:      PropTypes.string,
  label:          PropTypes.string.isRequired,
  orderOptionsBy: PropTypes.string.isRequired,

  toggleSwitch:   PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  togglePosition: PropTypes.oneOf(['right', 'left']),
  selection:      PropTypes.array,

  onFocus:        PropTypes.func.isRequired,
  onChange:       PropTypes.func.isRequired,
  onKeyDown:      PropTypes.func.isRequired,
  onClear:        PropTypes.func.isRequired,
  onToggle:       PropTypes.func.isRequired
};
