/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import PageWithForm from '../PageWithForm/PageWithForm';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import FormFieldset from '../FormFieldset/FormFieldset';

function Login({
  onLogin, isSubmitting, serverRequestStatus, staticContent,
}) {
  const { heading, submitBtnText, redirectionSection } = staticContent;
  // контроль инпутов и валидация
  const {
    values, setValues, handleChangeInput, errors, isValid, resetFrom,
  } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin();
  }

  return (
    <main className="login page__main-content">
      <PageWithForm
        heading={heading}
        formName="login"
        submitBtnText={isSubmitting ? submitBtnText.default : submitBtnText.isLoading}
        onSubmit={handleSubmit}
        submitButtonState={isValid}
        redirectionSection={redirectionSection}
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
              placeholder: 'email',
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
              placeholder: 'пароль',
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
  onLogin: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  serverRequestStatus: PropTypes.string,
  staticContent: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    submitBtnText: PropTypes.shape({
      default: PropTypes.string.isRequired,
      isLoading: PropTypes.string.isRequired,
    }).isRequired,
    redirectionSection: PropTypes.shape({
      link: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      linkText: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Login.defaultProps = {
  isSubmitting: true,
  serverRequestStatus: 'success',
};

export default Login;
