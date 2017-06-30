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

  shouldComponentUpdate() {
    return true;
  }

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
  className:   '',
  title:       ''
};

// prop types checking
Tag.propTypes = {
  className: PropTypes.string,
  title:     PropTypes.string,

  onClear:   PropTypes.func.isRequired
};
