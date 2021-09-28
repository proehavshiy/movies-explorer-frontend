import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({ text }) {
  return (
    <button className="page__button" type="button" aria-label="Кнопка входа">{text}</button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
};

Button.defaultProps = {
  text: 'Войти',
};

export default Button;
