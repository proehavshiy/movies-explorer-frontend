/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import './Header.css';
import PropTypes from 'prop-types';
import Logo from '../Logo/Logo';
import AuthBar from '../AuthBar/AuthBar';
import NavBar from '../NavBar/NavBar';
import Burger from '../Burger/Burger';

function Header({ isLoggedIn }) {
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = React.useState(false);
  function handleBurgerClick() {
    setIsOpenBurgerMenu(!isOpenBurgerMenu);
  }

  // закрытие бургерного меню по клику вне меню
  function closeBurgerOnLayout(evt) {
    if (evt.target === evt.currentTarget) {
      setIsOpenBurgerMenu(false);
    }
  }
  // запрет скролла при открытом попапе
  React.useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpenBurgerMenu ? 'hidden' : 'auto';
  }, [isOpenBurgerMenu]);
  return (
    <header className="header">
      <div className="container">
        <div className={`header__body ${isOpenBurgerMenu && 'header__body_style_fogging'}`} onClick={closeBurgerOnLayout}>
          <Logo />
          {!isLoggedIn && <AuthBar />}
          {isLoggedIn && (
            <>
              <Burger
                isOpen={isOpenBurgerMenu}
                onClick={handleBurgerClick}
              />
              <NavBar
                isOpen={isOpenBurgerMenu}
                onClose={setIsOpenBurgerMenu}
                path={{
                  mainPagePath: '/',
                  moviesPath: '/movies',
                  savedMoviesPath: '/saved-movies',
                  profilePath: '/profile',
                }}
                titles={{
                  mainPageTitle: 'Главная',
                  moviesTitle: 'Фильмы',
                  savedMoviesTitle: 'Сохранённые фильмы',
                  profileTitle: 'Аккаунт',
                }}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
