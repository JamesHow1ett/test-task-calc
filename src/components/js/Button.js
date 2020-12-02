import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    className: '',
    disabled: false
  }

  handleButtonClick = event => {
    const { onClick, disabled } = this.props;

    if (disabled) return;

    onClick && onClick({ event });
  }

  renderChildren = () => {
    const { children } = this.props;

    if (children) {
      return children;
    }

    return 'Button';
  }


  render() {
    const { className, disabledd } = this.props;
    const _className = cx(className);
    return (
      <div className={_className}>
      {
        this.renderChildren()
      }
      </div>
    )
  }
}

export default Button;
