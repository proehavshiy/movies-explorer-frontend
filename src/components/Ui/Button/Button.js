import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({ text, ButtonType, onClick }) {
  return (
    <button className={`page__button page__button_${ButtonType}`} onClick={onClick} type="button" aria-label={`кнопка ${text}`}>{text}</button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  ButtonType: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  text: 'Войти',
  ButtonType: 'enter',
  onClick: null,
};

export default Button;
