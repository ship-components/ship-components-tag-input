import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import icon from 'ship-components-icon';
import css from './Tag.css';

/**
 *  Tag component based on the material "chip" component
 */
export default class Tag extends React.Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
  }

  /**
   * Optimizes the app performance
   *
   * @param {object} nextProps
   * @returns {bool}
   * @memberof Tag
   */
  shouldComponentUpdate(nextProps) {
    const propsToCheck = ['className', 'title'];
    return propsToCheck.some(field => this.props[field] !== nextProps[field]);
  }

  /**
   * Clears an item from the tag container
   *
   * @param {any} event
   * @memberof Tag
   */
  handleClear(event) {
    if (this.props.onClear === 'function') {
      this.props.onClear(event);
    }
  }

  render() {
    return (
      <div className={classNames(css.container, this.props.className)}>
        <span className={css.title}>
          {this.props.title}
        </span>
        <button
          className={css['clear-btn']}
          onClick={this.props.onClear}
        >
          <i className={classNames(css['cancel-icon'], icon.cancel)} />
        </button>
      </div>
    );
  }
}

// default props
Tag.defaultProps = {
  className:   ''
};

// prop types checking
Tag.propTypes = {
  className: PropTypes.string,
  title:     PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  onClear:   PropTypes.func.isRequired
};
