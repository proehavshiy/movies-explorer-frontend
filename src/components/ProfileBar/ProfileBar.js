import React from 'react';
import './ProfileBar.css';
import { NavLink } from 'react-router-dom';

function ProfileBar() {
  return (
    <div className="header__profile-bar">
      <NavLink className="header__profile page__link" activeClassName="selected" to="/profile">
        Аккаунт
      </NavLink>
      <div className="header__profile-icon" />

    </div>
  );
}

export default ProfileBar;
