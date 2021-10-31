/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import PageWithForm from '../PageWithForm/PageWithForm';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import FormFieldset from '../FormFieldset/FormFieldset';

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
    <main className="login page__main-content">
      <PageWithForm
        // isLogo
        heading="Рады видеть!"
        formName="login"
        submitBtnText={isSubmitting ? 'Войти' : 'Вход...'}
        onSubmit={handleSubmit}
        submitButtonState={isValid}
        redirectionSection={{
          link: '/signup',
          title: 'Ещё не зарегистрированы?',
          linkText: 'Регистрация',
        }}
      >
        <FormFieldset
          inputs={[
            {
              inputStyle: 'auth',
              labelName: 'E-mail',
              inputName: 'email',
              inputType: 'email',
              onChange: handleChangeInput,
              error: errors.email,
              inputValue: values.email,
              isRequired: true,
              minLength: 6,
              maxLength: 30,
              id: 1,
            },
            {
              inputStyle: 'auth',
              labelName: 'Пароль',
              inputName: 'password',
              inputType: 'password',
              onChange: handleChangeInput,
              error: errors.password,
              inputValue: values.password,
              isRequired: true,
              minLength: 8,
              id: 2,
            },
          ]}
        />
      </PageWithForm>
    </main>
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
