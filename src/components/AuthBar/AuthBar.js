import React from 'react';
import './AuthBar.css';
import { NavLink, useHistory } from 'react-router-dom';
import Button from '../Ui/Button/Button';

function AuthBar() {
  const history = useHistory();
  return (
    <div className="header__auth-bar">
      <NavLink className="header__register page__link" activeClassName="selected" to="/signup">Регистрация</NavLink>
      <Button
        text="Войти"
        btnStyle="enter"
        type="button"
        disabled={false}
        onClick={() => history.push('/signin')}
      />
    </div>
  );
}

export default AuthBar;
