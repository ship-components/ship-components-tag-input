import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Immutable from 'immutable';

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
          onKeyDown={this.props.onKeyDown}
          onChange={this.props.onChange}
          value={this.props.filterText}
          className={classNames(css.filter, {
            empty: this.props.isEmpty,
            hidden: !this.props.multiple && !this.props.isDropdownOpen.array,
            [css.withTags]: this.props.selection.size > 0
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
          className={css['multi-selection-area']}
          onClick={this.handleOpenDropdown}
        >
          {this.props.invert ? this.filterHtml.call(this) : null}
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
          {this.props.invert ? null : this.filterHtml.call(this)}
        </div>
      );
    }

    return (
      <div
        className={css['selection-area']}
        onClick={this.props.selection.size === 0 ? this.handleOpenDropdown : null}
      >
        {this.props.invert ? this.filterHtml.call(this) : null}
        <span
          className={classNames(
            css.selection,
            {
              empty: this.props.isEmpty,
              hidden: (this.props.filterable && this.props.isDropdownOpen)
            }
          )}
        >
          {this.props.selection && this.props.selection.first() ? this.props.selection.first()[this.props.orderOptionsBy] : this.props.label}
        </span>
        {this.props.invert ? null : this.filterHtml.call(this)}
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
        className={css['toggle-container']}
      >
        {this.props.toggleSwitch !== false ?
          <button
            tabIndex="-1"
            className={classNames(css['toggle-btn'], {
              [css.hidden]: this.props.loading,
              [css.darkTheme]: this.props.darkTheme,
              [css.toggleRightPos]: this.props.togglePosition === 'right'
            })}
            onClick={this.props.onToggle}
          >
            {this.props.toggleSwitch}
          </button>
          : null}
        <Loader
          visible={this.props.loading}
          className={classNames(css.loader, {
            [css.toggleRightPos]: this.props.togglePosition && this.props.togglePosition === 'right'
          })}
          spinnerClassName={css['loader-spinner']}
        />
      </div>
    );
  }

  render() {
    let selectionDisplay = this.selectionDisplayHtml.call(this);
    let toggleBtn = this.dropdownToggleHtml.call(this);

    return (
      <div
        className={css.controls}
      >
        {this.props.togglePosition === 'right' ? null : toggleBtn}
        {selectionDisplay}
        {this.props.togglePosition === 'right' ? toggleBtn : null}
      </div>
    );
  }
}

// default props
SelectControls.defaultProps = {
  open: false,
  loading: false,
  isDropdownOpen: false,
  isEmpty: false,
  multiple: false,
  filterable: false,
  invert: false,

  label: '',
  filterText: '',

  toggleSwitch: 'library_add',
  togglePosition: 'left'
};

// prop types checking
SelectControls.propTypes = {
  open: PropTypes.bool,
  loading: PropTypes.bool,
  isDropdownOpen: PropTypes.bool,
  isEmpty: PropTypes.bool,
  multiple: PropTypes.bool,
  filterable: PropTypes.bool,
  darkTheme: PropTypes.bool.isRequired,
  invert: PropTypes.bool,

  label: PropTypes.string,
  filterText: PropTypes.string,
  orderOptionsBy: PropTypes.string.isRequired,

  toggleSwitch: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  togglePosition: PropTypes.oneOf(['right', 'left']),
  selection: PropTypes.instanceOf(Immutable.List).isRequired,

  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};
