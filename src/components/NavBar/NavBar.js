import React from 'react';
import './NavBar.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

function NavBar({ isOpen, path, titles }) {
  const {
    mainPagePath, moviesPath, savedMoviesPath, profilePath,
  } = path;
  const {
    mainPageTitle, moviesTitle, savedMoviesTitle, profileTitle,
  } = titles;
  return (
    <nav className={`nav-bar ${isOpen && 'nav-bar_opened'} `}>
      <ul className="nav-bar__list">
        <li>
          <NavLink className="nav-bar__link nav-bar__link_navigation page__link" to={mainPagePath}>{mainPageTitle}</NavLink>
        </li>
        <li>
          <NavLink className="nav-bar__link nav-bar__link_navigation nav-bar__link_accent page__link" to={moviesPath}>{moviesTitle}</NavLink>
        </li>
        <li>
          <NavLink className="nav-bar__link nav-bar__link_navigation page__link" to={savedMoviesPath}>{savedMoviesTitle}</NavLink>
        </li>
      </ul>
      <NavLink className="nav-bar__link page__link account-button account-button_margin-bottom" to={profilePath}>
        <p className="account-button__subtitle">{profileTitle}</p>
        <div className="account-button__icon" />
      </NavLink>
    </nav>
  );
}

NavBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  path: PropTypes.exact({
    mainPagePath: PropTypes.string,
    moviesPath: PropTypes.string,
    savedMoviesPath: PropTypes.string,
    profilePath: PropTypes.string,
  }).isRequired,
  titles: PropTypes.exact({
    mainPageTitle: PropTypes.string,
    moviesTitle: PropTypes.string,
    savedMoviesTitle: PropTypes.string,
    profileTitle: PropTypes.string,
  }).isRequired,
};

export default NavBar;
