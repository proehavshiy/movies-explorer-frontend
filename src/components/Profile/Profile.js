/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useFormWithValidation from '../../hooks/useFormWithValidation';
import PageWithForm from '../PageWithForm/PageWithForm';
import FormFieldset from '../FormFieldset/FormFieldset';

function Profile({
  onSubmit, onLogout, isSubmitting, staticContent,
}) {
  const { submitBtnText, logoutBtnText } = staticContent;
  const { changeBtn, logoutBtn } = isSubmitting;
  const currentUser = React.useContext(CurrentUserContext);
  const {
    values, setValues, handleChangeInput, errors, isValid, resetFrom,
  } = useFormWithValidation();

  // подстановка значений в форму из контекста
  React.useEffect(() => {
    resetFrom({
      name: currentUser.name,
      email: currentUser.email,
    }, {}, true);
  }, [currentUser, resetFrom]);

  const [state, setState] = React.useState({});

  function handleSubmit(evt) {
    // setState(false);
    setState((prevState) => ({
      ...prevState,
      changeBtn: false,
    }));
    evt.preventDefault();
    onSubmit(values.name, values.email);
    // setState(true);
    setState((prevState) => ({
      ...prevState,
      changeBtn: true,
    }));
  }

  function handleLogout(evt) {
    setState((prevState) => ({
      ...prevState,
      logoutBtn: false,
    }));
    evt.preventDefault();
    onLogout();
    // setState(true);
    setState((prevState) => ({
      ...prevState,
      logoutBtn: true,
    }));
  }

  return (
    <main className="profile page__main-content page__main-content-padding-top">
      <PageWithForm
        pageType="profile"
        formStyle="profile"
        heading={`Привет, ${currentUser.name}!`}
        isLogo={false}
        formName="profile"
        submitBtnText={state.changeBtn ? (changeBtn ? submitBtnText.default : submitBtnText.isLoading) : submitBtnText.default}
        logoutBtnText={state.logoutBtn ? (logoutBtn ? logoutBtnText.default : logoutBtnText.isLoading) : logoutBtnText.default}
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
  onSubmit: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isSubmitting: PropTypes.shape({
    changeBtn: PropTypes.bool,
    logoutBtn: PropTypes.bool,
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
  isSubmitting: {
    changeBtn: true,
    logoutBtn: true,
  },
};

export default Profile;
