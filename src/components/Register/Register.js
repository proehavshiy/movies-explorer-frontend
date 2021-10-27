/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Register.css';
import PropTypes from 'prop-types';
import PageWithForm from '../PageWithForm/PageWithForm';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import FormFieldset from '../FormFieldset/FormFieldset';

// eslint-disable-next-line no-unused-vars
function Register({ onRegister, isSubmitting, serverRequestStatus }) {
  // контроль инпутов и валидация
  const {
    // eslint-disable-next-line no-unused-vars
    values, setValues, handleChangeInput, errors, isValid, resetFrom,
  } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <main className="register page__main-content">
      <PageWithForm
        heading="Добро пожаловать!"
        formName="register"
        submitBtnText={isSubmitting ? 'Зарегистрироваться' : 'Регистрация...'}
        onSubmit={handleSubmit}
        submitButtonState={isValid}
        redirectionSection={{
          link: '/signin',
          title: 'Уже зарегистрированы?',
          linkText: 'Войти',
        }}
      >
        <FormFieldset
          inputs={[
            {
              inputStyle: 'auth',
              labelName: 'Имя',
              inputName: 'name',
              inputType: 'text',
              onChange: handleChangeInput,
              error: errors.name,
              inputValue: values.name,
              isRequired: true,
              minLength: 2,
              maxLength: 15,
              id: 1,
            },
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
              id: 2,
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
              id: 3,
            },
          ]}
        />
      </PageWithForm>
    </main>
  );
}

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  serverRequestStatus: PropTypes.string,
};

Register.defaultProps = {
  isSubmitting: true,
  serverRequestStatus: 'success',
};

export default Register;
