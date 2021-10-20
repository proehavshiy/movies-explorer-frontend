import React from 'react';
import './PageWithForm.css';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Ui/Button/Button';
import Logo from '../Logo/Logo';

function PageWithForm({
  name, submitText, onSubmit, submitButtonState, children,
}) {
  const { pathname } = useLocation();
  const textContent = {
    headingText: (pathname === '/signup' && 'Добро пожаловать!') || (pathname === '/signin' && 'Рады видеть!'),
    redirectionLink: (pathname === '/signup' && '/signin') || (pathname === '/signin' && '/signup'),
    redirectionTitle: (pathname === '/signup' && 'Уже зарегистрированы?') || (pathname === '/signin' && 'Ещё не зарегистрированы?'),
    redirectionText: (pathname === '/signup' && 'Войти') || (pathname === '/signin' && 'Регистрация'),
  };
  return (
    <div className="page-with-form">
      <div className="page-with-form__container">
        <div className="page-with-form__top">
          <Logo />
          <h1 className="page-with-form__heading">
            {textContent.headingText}
          </h1>
        </div>
        <form className="form" onSubmit={onSubmit} name={`${name}-form`} noValidate autoComplete="off">
          {children}
          <section className="form__button-section">
            <Button
              text={submitText}
              btnStyle="submit"
              type="submit"
              disabled={!submitButtonState}
              onClick={null}
            />
            <p className="form__redirection">
              {textContent.redirectionTitle}
              <Link to={textContent.redirectionLink} className="form__link page__button">{textContent.redirectionText}</Link>
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}

PageWithForm.propTypes = {
  name: PropTypes.string.isRequired,
  submitText: PropTypes.string.isRequired,
  onSubmit: PropTypes.string.isRequired,
  submitButtonState: PropTypes.string,
  children: PropTypes.string.isRequired,
};

PageWithForm.defaultProps = {
  submitButtonState: false,
};

export default PageWithForm;
