import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classNames';
import icon from 'ship-components-icon';

import css from './Dropdown.css';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.setScrollTop = this.setScrollTop.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filterText !== this.props.filterText) {
      this.handleHighlight.call(this, nextProps.options.length > 0 ? nextProps.options[0] : null);
      this.setScrollTop(0);
    }
  }

  componentDidUpdate() {
    // handle auto-scrolling for arrow keys
    let optionContainer = ReactDOM.findDOMNode(this.refs.optionContainer);
    let highlightedOption = ReactDOM.findDOMNode(this.refs.highlightedOption);

    if (!highlightedOption) {
      return;
    }

    let optionYMax = highlightedOption.offsetTop + highlightedOption.offsetHeight;
    let optionYMin = highlightedOption.offsetTop;
    let yMax = optionContainer.scrollTop + optionContainer.offsetHeight;
    let yMin = optionContainer.scrollTop;

    if (optionYMax > yMax) {
      this.setScrollTop(highlightedOption.offsetTop - (optionContainer.offsetHeight - highlightedOption.offsetHeight));
    } else if (optionYMin < yMin) {
      this.setScrollTop(highlightedOption.offsetTop);
    }
  }

  handleHighlight(option, event) {
    if (event && event.type === 'mousemove' && this.swallowMouseEvent) {
      this.swallowMouseEvent = false;
      return;
    }

    if (!(this.highlightedOption && this.props.highlightedOption.key !== option.key)) {
      this.props.onHighlight(option);
    }
  }

  setScrollTop(newScrollTop) {
    ReactDOM.findDOMNode(this.refs.optionContainer).scrollTop = newScrollTop;
    // @swallowMouseEvent   using javascript to move the scroll position causes <option> to "involuntarily" fire mouseenter. seen in chrome.
    this.swallowMouseEvent = true;
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

    if (this.props.newTag) {
      highlightedOption = this.props.newTag;
    }

    let currentOptionGroup = -1;
    let togglePositionClass = this.props.togglePosition === 'left' ? css['left-toggle'] : css['right-toggle'];

    return (
      <ul
        ref='optionContainer'
        className={classNames(css.dropdown, togglePositionClass, {[css.open]: this.props.open})}
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
                  onMouseMove={this.handleHighlight.bind(this, option)}
                  className={
                    classNames(
                      css.option,
                      option.className,
                      optionVariableClasses
                    )}
                >
                  <div
                    // eslint-disable-next-line react/jsx-no-bind
                    onClick={this.props.onSelect.bind(null, option)}
                    className={css['option-btn']}
                  >
                    {option.icon ?
                      React.cloneElement(option.icon,{className: classNames(option.icon.props.className, css['option-icon'])})
                      : null}
                    <div className={css['option-text']}>
                      <span className={css['option-title']}>{option.title}</span>
                      {option.body ?
                        <span className={css['option-body']}>{option.body}</span>
                        : null}
                    </div>
                  </div>
                </li>);
              return elements;
            })
          : this.renderNoOptionsMessage.call(this)}
        {this.props.newTag ?
          <li
            className={classNames(
              css.option,
              css.highlight
            )}
          >
            <div
              // eslint-disable-next-line react/jsx-no-bind
              onClick={this.props.onSelectNew.bind(null, this.props.newTag)}
              className={classNames(css['option-btn'], css['new-option'])}
            >
              <span>{this.props.newTag.body || this.props.newTag.title}</span>
              <span className={css['add-new-tag']}>
                <i className={icon.add} /> New tag
              </span>
            </div>
          </li>
          : null}
      </ul>
    );
  }
}

// default props
Dropdown.defaultProps = {
  open:               false,
  loading:            false,

  filterText:          '',
  togglePosition:     'left',
  noOptionsMessage:   '',

  style:              {},
  highlightedOption:  {},
  newTag:             {},

  options:            [],
  optionGroupTitles:  []
};

// prop types checking
Dropdown.propTypes = {
  open:               PropTypes.bool,
  loading:            PropTypes.bool,

  filterText:          PropTypes.string,
  togglePosition:     PropTypes.string,
  noOptionsMessage:   PropTypes.string,

  style:              PropTypes.object,
  highlightedOption:  PropTypes.object,
  newTag:             PropTypes.object,

  options:            PropTypes.array,
  optionGroupTitles:  PropTypes.array,

  onHighlight:        PropTypes.func.isRequired,
  onKeyDown:          PropTypes.func.isRequired,
  onSelect:           PropTypes.func.isRequired,
  onSelectNew:        PropTypes.func.isRequired
};
