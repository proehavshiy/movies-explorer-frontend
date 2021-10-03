/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import PageWithForm from '../PageWithForm/PageWithForm';
import useFormWithValidation from '../../hooks/useFormWithValidation';

// eslint-disable-next-line no-unused-vars
function Login({ onRegister, isSubmitting, serverRequestStatus }) {
  // контроль инпутов и валидация
  const {
    // eslint-disable-next-line no-unused-vars
    values, setValues, handleChangeInput, errors, isValid, resetFrom,
  } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <div className="login">
      <PageWithForm
        name="login"
        submitText={isSubmitting ? 'Войти' : 'Вход...'}
        // eslint-disable-next-line react/jsx-no-bind
        onSubmit={handleSubmit}
        submitButtonState={isValid}
      >
        <fieldset className="form__profile-information">
          <section className="form__input-section">
            <label className="form__input-label" htmlFor="email">
              E-mail
            </label>
            <input className={`form__input ${errors.email && 'form__input_error'}`} value={values.email || ''} onChange={handleChangeInput} id="email" type="email" name="email" required minLength={6} maxLength={30} />
            <span className={`form__input-error ${errors.email && 'form__input-error_active'}`}>
              {errors.email}
            </span>
          </section>
          <section className="form__input-section">
            <label className="form__input-label" htmlFor="password">
              Пароль
            </label>
            <input className={`form__input ${errors.password && 'form__input_error'}`} value={values.password || ''} onChange={handleChangeInput} id="password" type="password" name="password" required minLength={8} />
            <span className={`form__input-error ${errors.password && 'form__input-error_active'}`}>
              {errors.password}
            </span>
          </section>
        </fieldset>
      </PageWithForm>
    </div>
  );
}

Login.propTypes = {
  onRegister: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  serverRequestStatus: PropTypes.string,
};

Login.defaultProps = {
  isSubmitting: true,
  serverRequestStatus: 'success',
};

export default Login;
