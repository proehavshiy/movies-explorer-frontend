import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Main from '../Main/Main';
import Header from '../Header/Header';
import ErrorPage from '../ErrorPage/ErrorPage';

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Header />
          <h1>«Фильмы»</h1>
        </Route>
        <Route path="/saved-movies">
          <Header />
          <h1>«Сохранённые фильмы»</h1>
        </Route>
        <Route path="/profile">
          <Header />
          <h1>страница с профилем пользователя</h1>
        </Route>
        <Route path="/signin">
          <h1>авторизация</h1>
        </Route>
        <Route path="/signup">
          <h1>регистрация</h1>
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
