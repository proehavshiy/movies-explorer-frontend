/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
import React from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm({ onSubmit, initialInputValue, isChecked, isValidateForm }) {
  const {
    values, handleChangeInput, isFormValid, resetFrom,
  } = useFormWithValidation();
  console.log('isFormValid:', isFormValid);

  // если необходимо, чтобы сохранилось значение поиска и чекбокса,
  // то нужно передать initialInputValue и isChecked
  React.useEffect(() => {
    resetFrom({
      search: initialInputValue,
      isShortFilms: isChecked,
    }, {}, true);
  }, [initialInputValue, isChecked, resetFrom]);

  return (
    <section className="form-wrapper">
      <form className="search-form" onSubmit={onSubmit} name="search-form" noValidate autoComplete="off">
        <fieldset className="search-form__fieldset">
          <section className="search-form__input-section">
            <div className="search-form__input-wrapper search-form__input-wrapper_search">
              <label className="search-form__input-label search-form__input-label_search" htmlFor="search" />
              <input
                className="search-form__input"
                value={values.search || ''}
                onChange={handleChangeInput}
                placeholder="Фильм"
                id="search"
                type="text"
                name="search"
                required
              />
              <button
                className="search-form__submit"
                type="submit"
                disabled={isValidateForm && !isFormValid}
                aria-label="кнопка найти"
              />
            </div>
          </section>
          <section className="search-form__input-section">
            <div className="search-form__input-wrapper">
              <label className="search-form__input-label search-form__input-label_checkbox" htmlFor="isShortFilms">
                <input
                  className="search-form__checkbox-short-films search-form__checkbox-short-films_invisible"
                  id="isShortFilms"
                  type="checkbox"
                  name="isShortFilms"
                  onChange={handleChangeInput}
                  value={values.isShortFilms || ''}
                  checked={values.isShortFilms || ''}
                />
                <span className="search-form__checkbox-short-films search-form__checkbox-short-films_visible" />
                Короткометражки
              </label>
            </div>
          </section>
        </fieldset>
      </form>
    </section>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialInputValue: PropTypes.string,
  isChecked: PropTypes.bool,
  isValidateForm: PropTypes.bool,
};

SearchForm.defaultProps = {
  initialInputValue: '',
  isChecked: false,
  isValidateForm: true,
};

export default SearchForm;
