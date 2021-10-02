/* eslint-disable max-len */
/* eslint-disable react/self-closing-comp */
import React from 'react';
// import { Route, Switch } from 'react-router-dom';
import './Header.css';
import {
  Switch, Route, Link, useLocation,
} from 'react-router-dom';
import Logo from '../Logo/Logo';
import AuthBar from '../AuthBar/AuthBar';
// import NavBar from '../NavBar/NavBar';
// import ProfileBar from '../ProfileBar/ProfileBar';

function Header() {
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = React.useState(false);
  const location = useLocation().pathname;
  console.log('location:', location);
  function handleBurgerClick() {
    setIsOpenBurgerMenu(!isOpenBurgerMenu);
  }

  const authHeadings = {
    checkLocation: location === '/signin' || location === '/signup',
    signin: {
      path: '/signin',
      heading: 'Рады видеть!',
    },
    signup: {
      path: '/signup',
      heading: 'Добро пожаловать!',
    },
  };
  // запрет скролла при открытом попапе
  React.useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpenBurgerMenu ? 'hidden' : 'auto';
  }, [isOpenBurgerMenu]);
  return (
    <div className="header">
      <div className={`container ${authHeadings.checkLocation && 'container_auth'}`}>
        <div className={`header__body ${isOpenBurgerMenu && 'header__body_fogging'} ${authHeadings.checkLocation && 'header__body_auth'}`}>
          <Logo />
          <Switch>
            <Route path={['/signin', '/signup']}>
              <h1 className="header__title">{(location === authHeadings.signin.path && authHeadings.signin.heading) || (location === authHeadings.signup.path && authHeadings.signup.heading)}</h1>
            </Route>
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
            {/* <nav className="hheader__profile-bar">
            <ul className="header__list">
              <li>
                <Link className="header__profile page__link" to="/profile">Аккаунт</Link>
              </li>
              <li>
                <button className="header__profile-button" type="button" aria-label="кнопка открыть профиль" />
              </li>
            </ul>
          </nav> */}
            {/* <Switch>
            <Route exact path="/">
              <AuthBar />
            </Route>
            <Route path={['/movies', '/saved-movies', '/profile']}>
              <NavBar />
              <ProfileBar />
            </Route>
          </Switch> */}
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default Header;
