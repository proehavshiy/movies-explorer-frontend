import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({
  text, btnStyle, type, disabled, onClick,
}) {
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={`page__button page__button_${btnStyle}`} onClick={onClick} type={type} disabled={disabled} aria-label={`кнопка ${text}`}>{text}</button>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  btnStyle: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  disabled: false,
  onClick: null,
};

export default Button;
