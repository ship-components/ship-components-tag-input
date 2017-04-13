import React, {PropTypes} from 'react';
import classNames from 'classnames';
import icon from 'ship-components-icon';
import css from "./Tag.css";

/**
 *  Tag component based on the material "chip" component
 */
export default class Tag extends React.Component {

  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
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

Tag.defaultProps = {
  className: '',
  title: ''
};

Tag.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  onClear: PropTypes.func
};
