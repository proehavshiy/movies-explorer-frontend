/* eslint-disable eqeqeq */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-bind */
import React from 'react';
import './App.css';
import {
  Switch, Route, useHistory,
} from 'react-router-dom';
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
import MAIN_PAGE from '../../config/staticPageContent/mainPageContent';
import moviesMockCards from '../../config/staticPageContent/moviesPageContent';
import PROFILE_PAGE from '../../config/staticPageContent/profilePageContent';
import LOGIN_PAGE from '../../config/staticPageContent/loginPageContent';
import REGISTER_PAGE from '../../config/staticPageContent/registerPageContent';
import STATUS_MESSAGES from '../../config/staticPageContent/statusMessages';
// контекст
import CurrentUserContext from '../../contexts/CurrentUserContext';
// api
import * as mainApi from '../../utils/MainApi';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(true);
  console.log('isLoggedIn:', isLoggedIn);
  const [currentUser, setCurrentUser] = React.useState({});
  const [infoToolTipStatus, setInfoToolTipStatus] = React.useState({});
  console.log('infoToolTipStatus:', infoToolTipStatus);
  console.log('currentUser:', currentUser);
  const history = useHistory();

  // открыватель попапа
  function openInfoPopup(fetchType, result, statusCode) {
    const phrase = statusCode === '500'
      ? STATUS_MESSAGES.default.error
      : STATUS_MESSAGES[fetchType][result][statusCode];
    setInfoToolTipStatus({
      type: result,
      isOpened: true,
      heading: phrase,
    });
  }

  // функция авторизации пользователя
  function authorizeUser() {
    mainApi.getUserInfo()
      .then(({ data }) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      }).catch(({ result, statusCode }) => {
        openInfoPopup('getUserInfo', result, statusCode);
      });
    history.push('/movies');
  }

  // получаем данные пользователя при успешной авторизации
  React.useEffect(() => {
    if (!isLoggedIn) return;

    authorizeUser();
  }, []);

  // установить статус кнопки во время запроса
  function setButtonStatus(button, status) {
    setIsSubmitting((prevState) => ({
      ...prevState,
      [button]: status,
    }));
  }

  function handleLogin(email, password) {
    setButtonStatus('loginBtnStatus', false);
    mainApi.login(email, password)
      .then(({ result, statusCode }) => {
        openInfoPopup('login', result, statusCode);
        authorizeUser();
      })
      .catch(({ result, statusCode }) => {
        openInfoPopup('login', result, statusCode);
      })
      .finally(() => {
        setButtonStatus('loginBtnStatus', true);
      });
  }

  function handleRegister(name, email, password) {
    setButtonStatus('registerBtnStatus', false);
    mainApi.register(name, email, password)
      .then(({ data }) => {
        if (data) {
          handleLogin(data.email, password);
        }
      })
      .catch(({ result, statusCode }) => {
        openInfoPopup('register', result, statusCode);
      })
      .finally(() => {
        setButtonStatus('registerBtnStatus', true);
      });
  }

  function handleChangeProfile(name, email) {
    setButtonStatus('changeBtnStatus', false);
    mainApi.updateUserInfo(name, email)
      .then(({ data, result, statusCode }) => {
        setCurrentUser(data);
        openInfoPopup('updateUserInfo', result, statusCode);
      })
      .catch(({ result, statusCode }) => {
        openInfoPopup('updateUserInfo', result, statusCode);
      })
      .finally(() => {
        setButtonStatus('changeBtnStatus', true);
      });
  }

  function handleLogOut() {
    setButtonStatus('logoutBtnStatus', false);
    mainApi.logOut()
      .then(({ result, statusCode }) => {
        openInfoPopup('logout', result, statusCode);
        setIsLoggedIn(false);
        history.push('/');
      })
      .catch(({ result, statusCode }) => {
        openInfoPopup('logout', result, statusCode);
      })
      .finally(() => {
        setButtonStatus('logoutBtnStatus', true);
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
              staticContent={MAIN_PAGE}
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
              isSubmitting={{
                changeBtnStatus: isSubmitting.changeBtnStatus ?? true,
                logoutBtnStatus: isSubmitting.logoutBtnStatus ?? true,
              }}
              staticContent={PROFILE_PAGE}
            />
          </ProtectedRoute>
          <Route path="/signin">
            <Login
              onLogin={handleLogin}
              isSubmitting={isSubmitting.loginBtnStatus}
              staticContent={LOGIN_PAGE}
            />
          </Route>
          <Route path="/signup">
            <Register
              onRegister={handleRegister}
              isSubmitting={isSubmitting.registerBtnStatus}
              staticContent={REGISTER_PAGE}
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
