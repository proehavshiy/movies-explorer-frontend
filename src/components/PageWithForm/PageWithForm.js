import React from 'react';
import './PageWithForm.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Ui/Button/Button';
import Logo from '../Logo/Logo';

function PageWithForm({
  heading, isLogo, formName, submitText, onSubmit, submitButtonState, children, redirectionSection,
}) {
  return (
    <div className="page-with-form">
      <div className="page-with-form__container">
        <div className="page-with-form__header">
          {isLogo && <Logo />}
          <h1 className="page-with-form__heading">
            {heading}
          </h1>
        </div>
        <form className="form" onSubmit={onSubmit} name={`${formName}-form`} noValidate autoComplete="off">
          {children}
          <section className="form__button-section">
            <Button
              text={submitText}
              btnStyle="submit"
              type="submit"
              disabled={!submitButtonState}
              onClick={null}
            />
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
  heading: PropTypes.string.isRequired,
  isLogo: PropTypes.bool,
  formName: PropTypes.string.isRequired,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  submitButtonState: PropTypes.bool,
  children: PropTypes.element.isRequired,
  redirectionSection: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
  }),
};

PageWithForm.defaultProps = {
  isLogo: true,
  submitText: 'Отправить',
  submitButtonState: false,
  redirectionSection: null,
};

export default PageWithForm;
