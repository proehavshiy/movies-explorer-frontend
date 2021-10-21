import React from 'react';
import './ErrorPage.css';
import { useHistory } from 'react-router-dom';
import Button from '../Ui/Button/Button';

function ErrorPage() {
  return (
    <div className="error">
      <div className="error__content-wrapper">
        <div className="error__position-wrapper">
          <h1 className="error__heading">404</h1>
          <p className="error__subtitle">Страница не найдена</p>
        </div>
      </div>
      <div className="error__nav-wrapper">
        <Button
          text="Назад"
          btnStyle="back"
          onClick={useHistory().goBack}
        />
      </div>
    </div>
  );
}

export default ErrorPage;
