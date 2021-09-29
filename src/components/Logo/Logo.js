import React from 'react';
import './Logo.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

function Logo() {
  return (
    <Link to="/">
      <img className="logo" src={logo} alt="лого" />
    </Link>
  );
}

export default Logo;
