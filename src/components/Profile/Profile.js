/* eslint-disable react-hooks/exhaustive-deps */
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
  const { changeBtnStatus, logoutBtnStatus } = isSubmitting;
  const currentUser = React.useContext(CurrentUserContext);
  const [inputValuesHaveChanged, setInputValuesHaveChanged] = React.useState(true);
  const {
    values, handleChangeInput, errors, resetFrom, isFormValid,
  } = useFormWithValidation();

  // подстановка значений в форму из контекста
  React.useEffect(() => {
    resetFrom({
      name: currentUser.name,
      email: currentUser.email,
    }, {}, false);
  }, []);

  // блокирование кнопки сабмита, если значения в полях не изменились
  React.useEffect(() => {
    if (values.name === currentUser.name && values.email === currentUser.email) {
      setInputValuesHaveChanged(false);
    } else {
      setInputValuesHaveChanged(true);
    }
  }, [currentUser.email, currentUser.name, values]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(values.name, values.email);
  };

  const handleLogout = (evt) => {
    evt.preventDefault();
    onLogout();
  };

  return (
    <main className="profile page__main-content page__main-content-padding-top page__animation">
      <PageWithForm
        pageType="profile"
        formStyle="profile"
        heading={`Привет, ${currentUser.name}!`}
        isLogo={false}
        formName="profile"
        submitBtnText={changeBtnStatus ? submitBtnText.default : submitBtnText.isLoading}
        logoutBtnText={logoutBtnStatus ? logoutBtnText.default : logoutBtnText.isLoading}
        onSubmit={handleSubmit}
        submitButtonState={inputValuesHaveChanged && isFormValid}
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
    changeBtnStatus: PropTypes.bool,
    logoutBtnStatus: PropTypes.bool,
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
    changeBtnStatus: true,
    logoutBtnStatus: true,
  },
};

export default Profile;
