import React from 'react';
import './ErrorPage.css';
import { useHistory } from 'react-router-dom';
import Button from '../Ui/Button/Button';

function ErrorPage() {
  return (
    <div className="error">
      <h2 className="error__heading">404</h2>
      <p className="error__subtitle">Страница не найдена</p>
      <Button
        text="Назад"
        btnStyle="back"
        onClick={useHistory().goBack}
      />
    </div>
  );
}

export default ErrorPage;
