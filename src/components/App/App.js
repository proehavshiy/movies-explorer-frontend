import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import ErrorPage from '../ErrorPage/ErrorPage';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import Footer from '../Footer/Footer';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header
            isLoggedIn={isLoggedIn}
          />
          <Main />
          <Footer />
        </Route>
        <Route path="/movies">
          <Header
            isLoggedIn={isLoggedIn}
          />
          <Movies />
        </Route>
        <Route path="/saved-movies">
          <Header
            isLoggedIn={isLoggedIn}
          />
          <h1>«Сохранённые фильмы»</h1>
        </Route>
        <Route path="/profile">
          <Header
            isLoggedIn={isLoggedIn}
          />
          <h1>страница с профилем пользователя</h1>
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
