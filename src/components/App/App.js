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
import mainPageContent from '../../utils/pageContent/mainPageContent';
import Profile from '../Profile/Profile';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = React.useState(true);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header
            isLoggedIn={isLoggedIn}
          />
          <Main
            content={mainPageContent}
          />
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
          <Profile />
        </Route>
        <Route path="/signin">
          <Login
            onRegister={() => { }}
            isSubmitting
            serverRequestStatus="success"
          />
        </Route>
        <Route path="/signup">
          <Register
            onRegister={() => { }}
            isSubmitting
            serverRequestStatus="success"
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
