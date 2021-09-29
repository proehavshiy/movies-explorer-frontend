import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './Header.css';
import Logo from '../Logo/Logo';
import AuthBar from '../AuthBar/AuthBar';
import NavBar from '../NavBar/NavBar';
import ProfileBar from '../ProfileBar/ProfileBar';

function Header() {
  return (
    <div className="header">
      <Logo />
      <Switch>
        <Route exact path="/">
          <AuthBar />
        </Route>
        <Route path={['/movies', '/saved-movies', '/profile']}>
          <NavBar />
          <ProfileBar />
        </Route>
      </Switch>
    </div>
  );
}

export default Header;
