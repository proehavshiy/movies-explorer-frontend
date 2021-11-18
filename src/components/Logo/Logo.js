import React from 'react';
import './Logo.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Logo() {
  return (
    <Link to="/" className="logo">
      <img className="logo__image" src={logo} alt="лого" />
    </Link>
  );
}

export default Logo;
