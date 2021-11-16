/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
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
import PROFILE_PAGE from '../../config/staticPageContent/profilePageContent';
import LOGIN_PAGE from '../../config/staticPageContent/loginPageContent';
import REGISTER_PAGE from '../../config/staticPageContent/registerPageContent';
// контекст
import CurrentUserContext from '../../contexts/CurrentUserContext';
// api
import * as mainApi from '../../utils/MainApi';
import * as moviesApi from '../../utils/MoviesApi';
// хуки
import useInfoPopupSettings from '../../hooks/openInfoPopup';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState({});
  const { _id } = currentUser;
  const {
    infoPopupSettings, closeInfoPopup, openInfoPopup,
  } = useInfoPopupSettings();
  const history = useHistory();

  // функция авторизации пользователя
  const authorizeUser = () => {
    mainApi.getUserInfo()
      .then(({ data }) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
        history.push('/movies');
      }).catch(({ result, statusCode }) => {
        openInfoPopup('getUserInfo', result, statusCode);
      });
  };

  // получаем данные пользователя при успешной авторизации
  React.useEffect(() => {
    if (!isLoggedIn) return;

    authorizeUser();
  }, []);

  // установить статус кнопки во время запроса
  const setButtonStatus = (button, status) => {
    setIsSubmitting((prevState) => ({
      ...prevState,
      [button]: status,
    }));
  };

  const handleLogin = (email, password) => {
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
  };

  const handleRegister = (name, email, password) => {
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
  };

  const handleChangeProfile = (name, email) => {
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
  };

  const handleLogOut = () => {
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
  };

  const handleAddMovie = (movieName, updateMoviesForRendering) => {
    const movies = JSON.parse(localStorage.getItem(`${_id} movies`));
    // если localstorage по какой-то причине не будет, то выведется попап с ошибкой
    if (!movies) {
      openInfoPopup('default', 'error', 'message');
    } else if (movies) {
      const favMovie = movies.find((movie) => movie.nameRU === movieName);
      const {
        nameRU, nameEN, description, director, country, year, duration, image, trailerLink, id,
      } = favMovie;
      mainApi.saveMovie(
        nameRU,
        nameEN,
        description,
        director,
        country ?? 'Без страны',
        year,
        duration,
        `${moviesApi.BASE_URL}${image.url}`,
        trailerLink,
        `${moviesApi.BASE_URL}${image.formats.thumbnail.url}`,
        id,
      )
        .then(({ data }) => {
          // нужно пометить добавленную карточку полем _id, чтобы понимать, что она в избранном
          // записать обратно в localstorage, чтобы потом по нему удалять карточку
          favMovie._id = data._id;
          // заменяем в localstorage карточку с _id (она теперь в избранном)
          const index = movies.indexOf(favMovie);
          movies.splice(index, 1, favMovie);
          // обновляем localstorage
          localStorage.setItem(`${_id} movies`, JSON.stringify(movies));
          // обновляем стейт для рендеринга карточек для компонента через колбэк
          updateMoviesForRendering();
        })
        .catch(() => {
          openInfoPopup('addToFavourites', 'error', 'addToFavouritesError');
        });
    }
  };

  const handleDeleteMovie = (id, updateMoviesForRendering) => {
    const movies = JSON.parse(localStorage.getItem(`${_id} movies`));
    // если localstorage по какой-то причине не будет, то выведется попап с ошибкой
    if (!movies) {
      openInfoPopup('default', 'error', 'message');
    } else if (movies) {
      mainApi.deleteMovie(id)
        .then(({ data }) => {
          const cardForDeletion = movies.find((card) => card._id === data.deletedMovie._id);
          const index = movies.indexOf(cardForDeletion);
          delete cardForDeletion._id;
          movies.splice(index, 1, cardForDeletion);
          // обновляем localstorage
          localStorage.setItem(`${_id} movies`, JSON.stringify(movies));
          // обновляем стейт для рендеринга карточек для компонента через колбэк
          updateMoviesForRendering();
        })
        .catch(({ result, statusCode }) => {
          openInfoPopup('deleteMovie', result, statusCode);
        });
    }
  };

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
              openInfoPopup={openInfoPopup}
              onAddCard={handleAddMovie}
              onDeleteCard={handleDeleteMovie}
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
              openInfoPopup={openInfoPopup}
              onDeleteCard={handleDeleteMovie}
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
          settings={infoPopupSettings}
          onClose={closeInfoPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
