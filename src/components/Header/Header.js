import React from 'react';
import './Header.css';
import logo from '../../images/logo.png';
import Button from '../Ui/Button/Button';

function Header() {
  return (
    <div className="header">
      <img className="header__logo" src={logo} alt="лого" />
      <Button />
    </div>
  );
}

export default Header;
