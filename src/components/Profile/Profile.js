/* eslint-disable no-return-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import './Profile.css';
import PropTypes from 'prop-types';
import useFormWithValidation from '../../hooks/useFormWithValidation';
// import Button from '../Ui/Button/Button';

// eslint-disable-next-line no-unused-vars
function Profile({
  userName, onSubmit, onLogout,
}) {
  const {
    // eslint-disable-next-line no-unused-vars
    values, setValues, handleChangeInput, errors, isValid, resetFrom,
  } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
  }
  return (
    <div className="profile page__main-content-padding-top">
      <div className="profile__header">
        <h1 className="profile__heading">
          {`Привет, ${userName}!`}
        </h1>
      </div>
      <form className="profile__form" onSubmit={onSubmit} name="profile-form" noValidate autoComplete="off">
        <fieldset className="profile__form-fieldset">
          <section className="profile__input-section">
            <div className="profile__input-wrapper">
              <label className="profile__input-label" htmlFor="name">Имя</label>
              <input
                className="profile__input"
                value={values.name || ''}
                onChange={handleChangeInput}
                type="text"
                name="name"
                required={false}
                minLength={2}
                maxLength={15}
              />
            </div>
            <span className={`profile__input-error ${errors.name && 'profile__input-error_active'}`}>
              {errors.name}
            </span>
          </section>
          <section className="profile__input-section">
            <div className="profile__input-wrapper">
              <label className="profile__input-label" htmlFor="email">
                E-mail
              </label>
              <input
                className="profile__input"
                value={values.email || ''}
                onChange={handleChangeInput}
                type="email"
                name="email"
                required={false}
                minLength={6}
                maxLength={30}
              />
            </div>
            <span className={`profile__input-error ${errors.email && 'profile__input-error_active'}`}>
              {errors.email}
            </span>
          </section>
        </fieldset>
        <section className="profile-button-section">
          <button className="profile__button profile__button_submit page__link" onSubmit={handleSubmit} type="submit" disabled={!isValid} aria-label="кнопка Редактировать">
            Редактировать
          </button>
          <button className="profile__button profile__button_logout page__link" onClick={onLogout} type="button" aria-label="кнопка Редактировать">
            Выйти из аккаунта
          </button>
          {/* <Button
            text="Редактировать"
            btnStyle="submit"
            type="submit"
            disabled={!submitButtonState}
            onClick={null}
          /> */}
        </section>
      </form>
    </div>
  );
}

Profile.propTypes = {
  userName: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // inputValue: PropTypes.string,
  // error: PropTypes.string,
  // submitButtonState: PropTypes.bool,
};

Profile.defaultProps = {
  userName: 'друг',
  // submitButtonState: false,
  // inputValue: '',
  // error: '',
};

export default Profile;
