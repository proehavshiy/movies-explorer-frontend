import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <div className="header__nav-bar">
      <NavLink className="header__movies page__link" activeClassName="selected" to="/movies">Фильмы</NavLink>
      <NavLink className="header__movies page__link" activeClassName="selected" to="/saved-movies">Сохранённые фильмы</NavLink>
    </div>
  );
}

export default NavBar;
