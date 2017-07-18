import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './Dropdown.css';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlight: false
    };
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

  render() {
    let highlightedOption = this.props.highlightedOption;

    let currentOptionGroup = -1;
    let togglePositionClass = this.props.togglePosition === 'left' ? css['left-toggle'] : css['right-toggle'];

    return (
      <ul
        ref='optionContainer'
        className={classNames(css.dropdown, togglePositionClass, {
          [css.open]: this.props.open,
          [css.darkTheme]: this.props.darkTheme
        })}
        style={this.props.style}
        onKeyDown={this.props.onKeyDown}
      >
        {this.props.options.length > 0 ?
          this.props.options
            .map((option) => {
              let elements = [];
              let isHighlighted = highlightedOption && highlightedOption.key === option.key;
              if (option.optionGroup && (currentOptionGroup < 0 || currentOptionGroup !== option.optionGroup)) {
                currentOptionGroup = option.optionGroup;
                elements.push(
                  <li
                    key={currentOptionGroup}
                    className={css['dropdown-option-group-title']}
                  >
                    {this.props.optionGroupTitles[currentOptionGroup]}
                  </li>
                );
              }

              let optionVariableClasses = {[css.highlight]: isHighlighted};
              optionVariableClasses[`ship-select--option-${option.optionGroup}`] = !!option.optionGroup;
              elements.push(
                <li
                  key={option.key || option.id}
                  ref={isHighlighted ? 'highlightedOption' : null}
                  // eslint-disable-next-line react/jsx-no-bind
                  className={
                    classNames(
                      css.option,
                      option.className,
                      optionVariableClasses,
                      {
                        [css.darkTheme]: this.props.darkTheme
                      }
                    )}
                >
                  <div
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={this.props.onSelect.bind(null, option)}
                    className={classNames(css['option-btn'], {
                      [css.darkTheme]: this.props.darkTheme
                    })}
                  >
                    {option.icon ?
                      React.cloneElement(option.icon,{className: classNames(option.icon.props.className, css['option-icon'])})
                      : null}
                    <div className={css['option-text']}>
                      <span className={css['option-title']}>{option[this.props.orderOptionsBy]}</span>
                      {option.body ?
                        <span className={css['option-body']}>{option.body}</span>
                        : null}
                    </div>
                  </div>
                </li>);
              return elements;
            })
          : this.renderNoOptionsMessage.call(this)}
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
