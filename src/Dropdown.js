import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Dropdown.css';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedItem: props.highlightedOption
    };
  }
  componentWillReceiveProps(nextProp) {
    this.setState({
      highlightedItem: nextProp.highlightedOption
    });
  }

  /**
   * Returns an optionGroup
   *
   * @param {object} option
   * @returns {DOM}
   */
  getOptionGroup(option) {
    return (
      <li
        key={option.optionGroup}
        className={css['dropdown-option-group-title']}
      >
        {this.props.optionGroupTitles[option.optionGroup]}
      </li>
    );
  }

  /**
   * Returns an option item
   *
   * @param {object} option
   * @returns {DOM}
   */
  getOptionItem(option) {
    let {
      highlightedOption,
      orderOptionsBy,
      darkTheme,
      onSelect
    } = this.props;

    let selector = option.key ? 'key' : this.props.orderOptionsBy;
    let isHighlighted = highlightedOption && highlightedOption[selector] === option[selector];

    return (
      <li
        key={option.key || option.id}
        ref={isHighlighted ? 'highlightedOption' : null}
        // eslint-disable-next-line react/jsx-no-bind
        onClick={onSelect.bind(null, option)}
        className={classNames(css.option,
          {
            [css.darkTheme]: darkTheme,
            [css[option.className]]: option.className,
            [css.highlight]: isHighlighted,
            [`ship-select--option-${option.optionGroup}`]: !!option.optionGroup
          }
        )}
      >
        {option.icon ?
          React.cloneElement(option.icon, { className: classNames(option.icon.props.className, css['option-icon']) })
          : null}
        {option[orderOptionsBy]}
        {option.body ?
          <span className={css['option-body']}>{option.body}</span>
          : null}
      </li>
    );
  }

  /**
   * Render
   * @param  {string} msg  the message
   * @return {JSX}
   */
  renderNoOptionsMessage() {
    let message = this.props.noOptionsMessage || `No options matching "${this.props.filterText}"`;

    if (this.props.loading) {
      message = 'Loading...';
    }

    if (this.props.filterText.length > 0) {
      return <li className={css['no-results']}>{message}</li>;
    }
  }

  renderOptions() {
    let { options } = this.props;

    return options
      .map((option) => {
        let currentOptionGroup = -1;
        let elements = [];

        // If there is any option groups
        if (option.optionGroup && (currentOptionGroup < 0
          || currentOptionGroup !== option.optionGroup)) {
          elements.push(this.getOptionGroup(option));
        }

        // Get each option
        elements.push(this.getOptionItem(option));

        return elements;
      });
  }

  render() {
    let {
      togglePosition,
      darkTheme,
      open,
      style,
      onKeyDown,
      options
    } = this.props;

    let togglePositionClass = togglePosition === 'left' ?
      css['left-toggle'] :
      css['right-toggle'];

    return (
      <ul
        ref='optionContainer'
        className={classNames(css.dropdown, togglePositionClass, {
          [css.open]: open,
          [css.darkTheme]: darkTheme
        })}
        style={style}
        onKeyDown={onKeyDown}
      >
        {options.length > 0 ?
          this.renderOptions() :
          this.renderNoOptionsMessage()}
      </ul>
    );
  }
}

// default props
Dropdown.defaultProps = {
  open:               false,
  loading:            false,
  darkTheme:          false,

  filterText:          '',
  togglePosition:     'left',
  noOptionsMessage:   '',

  style:              {},
  highlightedOption:  {},

  options:            [],
  optionGroupTitles:  []
};

// prop types checking
Dropdown.propTypes = {
  open:               PropTypes.bool,
  loading:            PropTypes.bool,
  darkTheme:          PropTypes.bool,

  filterText:          PropTypes.string,
  togglePosition:     PropTypes.string,
  noOptionsMessage:   PropTypes.string,
  orderOptionsBy:     PropTypes.string.isRequired,

  style:              PropTypes.object,
  highlightedOption:  PropTypes.object,

  options:            PropTypes.array,
  optionGroupTitles:  PropTypes.array,

  onKeyDown:          PropTypes.func.isRequired,
  onSelect:           PropTypes.func.isRequired
};
