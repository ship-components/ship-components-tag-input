import React from 'react';
import classNames from 'classnames';
import css from './Loader.css';

export default class Loader extends React.Component {

  shouldComponentUpdate(nextProps) {
    return this.props.visible !== nextProps.visible ||
          this.props.absolute !== nextProps.absolute ||
          this.props.className !== nextProps.className;
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <div className={classNames(
          css.container,
          this.props.className,
        {
          [css.absolute]: this.props.absolute,
          [css.visible]: this.props.visible
        }
        )}
      >
        <svg
          className={classNames(css.spinner, this.props.spinnerClassName)}
          viewBox='0 0 66 66'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            className={css['spinner-path']}
            fill='none'
            cx='33'
            cy='33'
            r='30'
          />
        </svg>
      </div>
    );
  }
}

Loader.defaultProps = {
  absolute: false,
  visible: true,
  className: '',
  spinnerClassName: ''
};
