import React from 'react';
import './Burger.css';
import PropTypes from 'prop-types';

function Burger({ isOpen, onClick }) {
  return (
    <button className={`burger ${isOpen && 'burger_opened'}`} onClick={onClick} type="button" aria-label="кнопка открыть меню">
      <span />
    </button>
  );
}

Burger.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Burger;
