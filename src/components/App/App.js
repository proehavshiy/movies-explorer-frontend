/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import './App.css';
import { Switch, Route, useHistory } from 'react-router-dom';
// компоненты
import Main from '../Main/Main';
import Header from '../Header/Header';
import ErrorPage from '../ErrorPage/ErrorPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
// статичный контент страниц
import mainPageContent from '../../utils/staticPageContent/mainPageContent';
import moviesMockCards from '../../utils/staticPageContent/moviesPageContent';
import profilePageContent from '../../utils/staticPageContent/profilePageContent';
import loginPageContent from '../../utils/staticPageContent/loginPageContent';
import registerPageContent from '../../utils/staticPageContent/registerPageContent';
// контекст
import CurrentUserContext from '../../contexts/CurrentUserContext';
// api
import * as mainApi from '../../utils/MainApi';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const [infoToolTipStatus, setInfoToolTipStatus] = React.useState({});
  console.log('infoToolTipStatus:', infoToolTipStatus);
  console.log('currentUser:', currentUser);
  const history = useHistory();

  // функция авторизации пользователя
  function authorizeUser() {
    setIsLoggedIn(true);
    history.push('/movies');
  }

  // получаем данные пользователя при успешной авторизации
  React.useEffect(() => {
    if (!isLoggedIn) return;

    mainApi.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
        console.log('данные пользователя получены:', userInfo);
      }).catch((err) => {
        console.log('не удалось получить данные пользователя:', err);
      });
  }, [isLoggedIn]);

  function handleLogin(email, password) {
    setIsSubmitting(false);
    mainApi.login(email, password)
      .then((successfullMessage) => {
        // сюда добавить попап статуса неуспешного логина
        console.log('залогинен:', successfullMessage);
        setInfoToolTipStatus({
          type: 'success',
          isOpened: true,
          heading: 'Вы успешно вошли',
        });
        authorizeUser();
      })
      .catch((err) => {
        setInfoToolTipStatus({
          type: 'error',
          isOpened: true,
          heading: err === '400' ? 'Некорректные данные. Исправьте, пожалуйста' : 'Ошибка сервера. Попробуйте позднее',
        });
      })
      .finally(() => {
        setIsSubmitting(true);
      });
  }

  function handleRegister(name, email, password) {
    setIsSubmitting(false);
    mainApi.register(name, email, password)
      .then((userData) => {
        if (userData) {
          console.log('зарегистрирован', userData);
          // сюда добавить попап статуса успешной регистрации
          // сразу логинимся после регистрации
          handleLogin(userData.email, password);
        }
      })
      .catch((err) => {
        console.log('ошибка регистрации:', err);
        // сюда добавить попап статуса неуспешной регистрации
        setInfoToolTipStatus({
          type: 'error',
          isOpened: true,
          heading: err === '400' ? 'Некорректные данные. Исправьте, пожалуйста' : 'Ошибка сервера. Попробуйте позднее',
        });
      })
      .finally(() => {
        setIsSubmitting(true);
      });
  }

  function handleChangeProfile(name, email) {
    setIsSubmitting(false);
    mainApi.updateUserInfo(name, email)
      .then((updatedProfileData) => {
        setCurrentUser(updatedProfileData);
        console.log('обновление профиля успешно:', updatedProfileData);
      })
      .catch((err) => {
        console.log('обновить данные пользователя не удалось:', err);
      })
      .finally(() => {
        setIsSubmitting(true);
      });
  }

  function handleLogOut() {
    mainApi.logOut()
      .then((res) => {
        setIsLoggedIn(false);
        history.push('/');
        console.log('вы успешно разлогинены:', res);
      })
      .then((err) => {
        console.log('разлогиниться не получилось. попробуйте позднее:', err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Header
              isLoggedIn={isLoggedIn}
            />
            <Main
              staticContent={mainPageContent}
            />
            <Footer />
          </Route>
          <ProtectedRoute
            path="/movies"
            loggedIn={isLoggedIn}
          >
            <Header
              isLoggedIn={isLoggedIn}
            />
            <Movies
              onSearchFormSubmit={() => { }}
              cardsData={moviesMockCards}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute
            path="/saved-movies"
            loggedIn={isLoggedIn}
          >
            <Header
              isLoggedIn={isLoggedIn}
            />
            <SavedMovies
              onSearchFormSubmit={() => { }}
              cardsData={moviesMockCards}
            />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute
            path="/profile"
            loggedIn={isLoggedIn}
          >
            <Header
              isLoggedIn={isLoggedIn}
            />
            <Profile
              onSubmit={handleChangeProfile}
              onLogout={handleLogOut}
              isSubmitting={isSubmitting}
              staticContent={profilePageContent}
            />
          </ProtectedRoute>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              isSubmitting={isSubmitting}
              serverRequestStatus="success"
              staticContent={loginPageContent}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              isSubmitting={isSubmitting}
              serverRequestStatus="success"
              staticContent={registerPageContent}
            />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
        <InfoToolTip
          settings={infoToolTipStatus}
          onClose={setInfoToolTipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
