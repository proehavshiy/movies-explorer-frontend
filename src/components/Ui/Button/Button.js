/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({
  text, label, btnStyle, type, disabled, onClick,
}) {
  return (
    <button className={`button button_type_${btnStyle}`} onClick={onClick} type={type} disabled={disabled} aria-label={label}>{text}</button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string,
  btnStyle: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  label: 'кнопка',
  type: 'button',
  disabled: false,
  onClick: null,
};

export default Button;
