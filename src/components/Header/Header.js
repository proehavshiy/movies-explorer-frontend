/* eslint-disable max-len */
/* eslint-disable react/self-closing-comp */
import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import './Header.css';
import {
  // Switch, Route,
  Link,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import AuthBar from '../AuthBar/AuthBar';
// import NavBar from '../NavBar/NavBar';
// import ProfileBar from '../ProfileBar/ProfileBar';

function Header({ isLoggedIn }) {
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = React.useState(false);
  function handleBurgerClick() {
    setIsOpenBurgerMenu(!isOpenBurgerMenu);
  }

  // запрет скролла при открытом попапе
  React.useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpenBurgerMenu ? 'hidden' : 'auto';
  }, [isOpenBurgerMenu]);
  return (
    <div className="header">
      <div className="container">
        <div className={`header__body ${isOpenBurgerMenu && 'header__body_fogging'}`}>
          <Logo />
          {!isLoggedIn && <AuthBar />}
          {isLoggedIn && (
            <>
              <button className={`header__burger ${isOpenBurgerMenu && 'header__burger_opened'}`} onClick={handleBurgerClick} type="button" aria-label="кнопка открыть меню">
                <span></span>
              </button>
              <nav className={`header__menu ${isOpenBurgerMenu && 'header__menu_opened'} `}>
                {/* <div className="header__menu-content-wrapper"> */}
                <ul className="header__list header__list_nav">
                  <li>
                    <Link className="header__link header__link_navigation page__link" to="/">Главная</Link>
                  </li>
                  <li>
                    <Link className="header__link header__link_navigation header__link_navigation_accent  page__link" to="/movies">Фильмы</Link>
                  </li>
                  <li>
                    <Link className="header__link header__link_navigation page__link" to="/saved-movies">Сохранённые фильмы</Link>
                  </li>
                </ul>
                <ul className="header__list">
                  <li>
                    <Link className="header__link header__link_account page__link" to="/profile">
                      <p className="header__link-subtitle">Аккаунт</p>
                      <button className="header__link header__account-button" type="button" aria-label="кнопка открыть профиль" />
                    </Link>
                  </li>
                </ul>
                {/* </div> */}
              </nav>
            </>
          )}

          {/* <Switch>
            <Route exact path="/">
              <AuthBar />
            </Route>
            <Route path={['/movies', '/saved-movies', '/profile']}>
              <button className={`header__burger ${isOpenBurgerMenu && 'header__burger_opened'}`} onClick={handleBurgerClick} type="button" aria-label="кнопка открыть меню">
                <span></span>
              </button>
              <nav className={`header__menu ${isOpenBurgerMenu && 'header__menu_opened'} `}>
                <ul className="header__list header__list_nav">
                  <li>
                    <Link className="header__link header__link_navigation page__link" to="/">Главная</Link>
                  </li>
                  <li>
                    <Link className="header__link header__link_navigation header__link_navigation_accent  page__link" to="/movies">Фильмы</Link>
                  </li>
                  <li>
                    <Link className="header__link header__link_navigation page__link" to="/saved-movies">Сохранённые фильмы</Link>
                  </li>
                </ul>
                <ul className="header__list">
                  <li>
                    <Link className="header__link header__link_account page__link" to="/profile">
                      <p className="header__link-subtitle">Аккаунт</p>
                      <button className="header__link header__account-button" type="button" aria-label="кнопка открыть профиль" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </Route>
          </Switch> */}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
