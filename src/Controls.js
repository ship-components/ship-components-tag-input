import React, {PropTypes} from 'react';
import classnames from 'classnames';

import Tag from './Tag';
import Loader from './Loader';
import css from './Controls.css';

export default class SelectControls extends React.Component {

  focusInput() {
    if (this.props.filterable) {
      this.refs.filterInput.focus();
    }
  }

  blurInput() {
    if (this.props.filterable) {
      this.refs.filterInput.blur();
    }
  }

  handleOpenDropdown() {
    if (this.props.multiple) {
      this.focusInput.call(this);
    }
    this.props.onFocus();
  }

  filterHtml() {
    return this.props.filterable ?
      (<input
        ref='filterInput'
        placeholder={this.props.placeholder}
        onKeyDown={this.props.onKeyDown}
        onChange={this.props.onChange}
        value={this.props.filterText}
        className={classnames(css.filter, {empty: this.props.isEmpty, hidden: !this.props.multiple && !this.props.isActive})}
        type='text'
      />)
      : null;
  }

  selectionDisplayHtml() {
    if (this.props.multiple) {
      return (
        <div
          key={1}
          className={css['multi-selection-area']}
          onClick={this.handleOpenDropdown.bind(this)}
        >
          {this.props.selection
            .map(item => {
              return (<Tag
                key={`ship-select-tag--${item.key || item.item.key}`}
                icon={item.icon}
                title={item.title}
                onClear={this.props.onClear.bind(this,item)}
                      />);
            })
          }
          {this.filterHtml.call(this)}
        </div>
      );
    }

    return (
      <div
        key={1}
        className={css['selection-area']}
        onClick={this.handleOpenDropdown.bind(this)}
      >
        <span
          className={classnames(
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

  dropdownToggleHtml() {
    return (<div
      key={0}
      className={css['toggle-container']}
            >
      {this.props.toggleSwitch !== false ?
        <button
          className={classnames(css['toggle-btn'], {[css.hidden]: this.props.loading})}
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
    </div>);
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

SelectControls.propTypes = {
  toggleSwitch: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  togglePosition: PropTypes.oneOf(['right', 'left'])
};
