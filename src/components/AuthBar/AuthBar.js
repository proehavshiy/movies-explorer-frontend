import React from 'react';
import './AuthBar.css';
import { NavLink } from 'react-router-dom';
import Button from '../Ui/Button/Button';

function AuthBar() {
  return (
    <div className="header__auth-bar">
      <NavLink className="header__register page__link" activeClassName="selected" to="/signup">Регистрация</NavLink>
      <Button />
    </div>
  );
}

export default AuthBar;
