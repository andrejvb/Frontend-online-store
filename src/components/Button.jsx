import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Button extends Component {
  render() {
    const { text } = this.props;
    return (
      <Link
        to="/checkout"
        data-testid="checkout-products"
      >
        <button type="button">{ text }</button>
      </Link>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
}.isRequired;

export default Button;
