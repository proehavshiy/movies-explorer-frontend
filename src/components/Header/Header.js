import React from 'react';
import './Header.css';
import Logo from '../Logo/Logo';
import AuthBar from '../AuthBar/AuthBar';
import NavBar from '../NavBar/NavBar';

function Header() {
  return (
    <div className="header">
      <Logo />
      <NavBar />
      <AuthBar />
    </div>
  );
}

export default Header;
