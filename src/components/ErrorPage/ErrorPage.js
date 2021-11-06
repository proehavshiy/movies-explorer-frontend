import React from 'react';
import './ErrorPage.css';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../Ui/Button/Button';

function ErrorPage({ heading, subHeading, btnText }) {
  return (
    <div className="error page__animation">
      <div className="error__content-wrapper">
        <div className="error__position-wrapper">
          <h1 className="error__heading">{heading}</h1>
          <p className="error__subtitle">{subHeading}</p>
        </div>
      </div>
      <div className="error__nav-wrapper">
        <Button
          text={btnText}
          btnStyle="back"
          onClick={useHistory().goBack}
        />
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  heading: PropTypes.string,
  subHeading: PropTypes.string,
  btnText: PropTypes.string,
};

ErrorPage.defaultProps = {
  heading: '404',
  subHeading: 'Страница не найдена',
  btnText: 'Назад',
};

export default ErrorPage;
