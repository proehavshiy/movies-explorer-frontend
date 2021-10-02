/* eslint-disable react/require-default-props */
import React from 'react';
import './PageWithForm.css';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Ui/Button/Button';

function PageWithForm({
  name, submitText, onSubmit, submitButtonState, children,
}) {
  const { pathname } = useLocation();
  const linkPlace = {
    title: (pathname === '/signup' && 'Уже зарегистрированы?') || (pathname === '/signin' && 'Ещё не зарегистрированы?'),
    link: (pathname === '/signup' && '/signin') || (pathname === '/signin' && '/signup'),
    text: (pathname === '/signup' && 'Войти') || (pathname === '/signin' && 'Регистрация'),
  };
  console.log('location:', pathname);
  return (
    <div className="page-with-form">
      <div className="page-with-form__container">
        <form className="form" onSubmit={onSubmit} name={`${name}-form`} noValidate autoComplete="off">
          {children}
          <Button
            text={submitText}
            btnStyle="submit"
            type="submit"
            disabled={!submitButtonState}
            onClick={null}
          />
          <p className="form__redirection">
            {linkPlace.title}
            <Link to={linkPlace.link} className="form__link page__button">{linkPlace.text}</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

PageWithForm.propTypes = {
  name: PropTypes.string,
  submitText: PropTypes.string,
  onSubmit: PropTypes.string,
  submitButtonState: PropTypes.string,
  children: PropTypes.string,
};

// PageWithForm.defaultProps = {
//   text: 'Войти',
//   ButtonType: 'enter',
//   onClick: null,
// };

export default PageWithForm;
