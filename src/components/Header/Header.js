import React from 'react';
import './Header.css';
import Button from '../Ui/Button/Button';
import Logo from '../Logo/Logo';

function Header() {
  return (
    <div className="header">
      <Logo />
      <Button />
    </div>
  );
}

export default Header;
