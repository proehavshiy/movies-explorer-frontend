import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <h1>«О проекте»</h1>
        </Route>
        <Route path="/movies">
          <h1>«Фильмы»</h1>
        </Route>
        <Route path="/saved-movies">
          <h1>«Сохранённые фильмы»</h1>
        </Route>
        <Route path="/profile">
          <h1>страница с профилем пользователя</h1>
        </Route>
        <Route path="/signin">
          <h1>авторизация</h1>
        </Route>
        <Route path="/signup">
          <h1>регистрация</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
