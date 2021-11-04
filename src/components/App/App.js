/* eslint-disable react/jsx-no-bind */
import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
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
// статичный контент страниц
import mainPageContent from '../../utils/staticPageContent/mainPageContent';
import moviesMockCards from '../../utils/staticPageContent/moviesPageContent';
import profilePageContent from '../../utils/staticPageContent/profilePageContent';
import loginPageContent from '../../utils/staticPageContent/loginPageContent';
import registerPageContent from '../../utils/staticPageContent/registerPageContent';
// api
import * as mainApi from '../../utils/MainApi';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  function handleRegister(name, email, password) {
    mainApi.register(name, email, password)
      .then((userData) => {
        if (userData) {
          console.log('зарегистрирован', userData);
        }
      })
      .catch((err) => {
        console.log('ошибка регистрации:', err);
      })
      .finally();
  }

  return (
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
        <Route path="/movies">
          <Header
            isLoggedIn={isLoggedIn}
          />
          <Movies
            onSearchFormSubmit={() => { }}
            cardsData={moviesMockCards}
          />
          <Footer />
        </Route>
        <Route path="/saved-movies">
          <Header
            isLoggedIn={isLoggedIn}
          />
          <SavedMovies
            onSearchFormSubmit={() => { }}
            cardsData={moviesMockCards}
          />
          <Footer />
        </Route>
        <Route path="/profile">
          <Header
            isLoggedIn={isLoggedIn}
          />
          <Profile
            onSubmit={() => console.log('onSubmitMock')}
            onLogout={() => console.log('onLogoutMock')}
            userName="Виталий"
            staticContent={profilePageContent}
          />
        </Route>
        <Route path="/signin">
          <Login
            onLogin={() => console.log('onLoginMock')}
            isSubmitting
            serverRequestStatus="success"
            staticContent={loginPageContent}
          />
        </Route>
        <Route path="/signup">
          <Register
            onRegister={handleRegister}
            isSubmitting
            serverRequestStatus="success"
            staticContent={registerPageContent}
          />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
