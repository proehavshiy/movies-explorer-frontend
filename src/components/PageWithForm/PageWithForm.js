/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import './PageWithForm.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Ui/Button/Button';
import Logo from '../Logo/Logo';

function PageWithForm({
  pageType, formStyle, heading, isLogo, formName, submitBtnText, onSubmit, submitButtonState, children, logoutSection, logoutBtnText, redirectionSection,
}) {
  return (
    <div className={`page-with-form page-with-form_type_${pageType}`}>
      <div className="page-with-form__container">
        <div className={`page-with-form__header page-with-form__header_type_${pageType} page-with-form__header_style_${formStyle}`}>
          {isLogo && <Logo />}
          <h1 className={`page-with-form__heading ${isLogo && 'page-with-form__heading_with-logo'}`}>
            {heading}
          </h1>
        </div>
        <form className={`form form_type_${pageType}`} onSubmit={onSubmit} name={`${formName}-form`} noValidate autoComplete="off">
          {children}
          <section className={`form__button-section form__button-section_type_${pageType}`}>
            <Button
              text={submitBtnText}
              btnStyle={formStyle}
              type="submit"
              disabled={!submitButtonState}
            />
            {logoutSection && (
              <Button
                text={logoutBtnText}
                btnStyle="logout"
                type="button"
                onClick={logoutSection.onLogout}
              />
            )}
            {redirectionSection && (
              <p className="form__redirection">
                {redirectionSection.title}
                <Link to={redirectionSection.link} className="form__link page__link">{redirectionSection.linkText}</Link>
              </p>
            )}
          </section>
        </form>
      </div>
    </div>
  );
}

PageWithForm.propTypes = {
  pageType: PropTypes.oneOf(['profile', 'auth']),
  formStyle: PropTypes.oneOf(['profile', 'auth']),
  heading: PropTypes.string.isRequired,
  isLogo: PropTypes.bool,
  formName: PropTypes.string.isRequired,
  submitBtnText: PropTypes.string,
  logoutBtnText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitButtonState: PropTypes.bool,
  children: PropTypes.element.isRequired,
  logoutSection: PropTypes.shape({
    onLogout: PropTypes.func.isRequired,
  }),
  redirectionSection: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
  }),
};

PageWithForm.defaultProps = {
  pageType: 'auth',
  formStyle: 'auth',
  isLogo: true,
  submitBtnText: 'Отправить',
  logoutBtnText: 'Выйти из аккаунта',
  submitButtonState: false,
  logoutSection: null,
  redirectionSection: null,
};

export default PageWithForm;
