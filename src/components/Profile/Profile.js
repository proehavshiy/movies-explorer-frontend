/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import PageWithForm from '../PageWithForm/PageWithForm';
import FormFieldset from '../FormFieldset/FormFieldset';

function Profile({
  userName, onSubmit, onLogout, isSubmitting, staticContent,
}) {
  const { submitBtnText, logoutBtnText } = staticContent;
  const {
    values, setValues, handleChangeInput, errors, isValid, resetFrom,
  } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onSubmit();
  }
  function handleLogout(evt) {
    evt.preventDefault();
    onLogout();
  }

  return (
    <main className="profile page__main-content page__main-content-padding-top">
      <PageWithForm
        pageType="profile"
        formStyle="profile"
        heading={`Привет, ${userName}!`}
        isLogo={false}
        formName="profile"
        submitBtnText={isSubmitting.forSubmitBtn ? submitBtnText.default : submitBtnText.isLoading}
        logoutBtnText={isSubmitting.forLogoutBtn ? logoutBtnText.default : logoutBtnText.isLoading}
        onSubmit={handleSubmit}
        submitButtonState={isValid}
        logoutSection={{
          onLogout: handleLogout,
        }}
      >
        <FormFieldset
          inputs={[
            {
              inputStyle: 'profile',
              labelName: 'Имя',
              inputName: 'name',
              inputType: 'text',
              onChange: handleChangeInput,
              error: errors.name,
              inputValue: values.name,
              placeholder: 'Имя',
              isRequired: true,
              minLength: 2,
              maxLength: 15,
              id: 1,
            },
            {
              inputStyle: 'profile',
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
              id: 2,
            },
          ]}
        />
      </PageWithForm>
    </main>
  );
}

Profile.propTypes = {
  userName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isSubmitting: PropTypes.shape({
    forSubmitBtn: PropTypes.bool.isRequired,
    forLogoutBtn: PropTypes.bool.isRequired,
  }),
  staticContent: PropTypes.shape({
    submitBtnText: PropTypes.shape({
      default: PropTypes.string.isRequired,
      isLoading: PropTypes.string.isRequired,
    }).isRequired,
    logoutBtnText: PropTypes.shape({
      default: PropTypes.string.isRequired,
      isLoading: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

Profile.defaultProps = {
  userName: 'друг',
  isSubmitting: {
    forSubmitBtn: true,
    forLogoutBtn: true,
  },
};

export default Profile;
