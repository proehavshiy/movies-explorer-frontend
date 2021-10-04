import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';

function NavTab() {
  return (
    <ul className="landing__nav">
      <li className="landing__link-wrapper">
        <Link className="landing__link" to="/">
          О проекте
        </Link>
      </li>
      <li className="landing__link-wrapper">
        <Link className="landing__link" to="/">
          Технологии
        </Link>
      </li>
      <li className="landing__link-wrapper">
        <Link className="landing__link" to="/">
          Студент
        </Link>
      </li>
    </ul>
  );
}

export default NavTab;
