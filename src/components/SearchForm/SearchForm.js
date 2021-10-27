/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';
import useFormWithValidation from '../../hooks/useFormWithValidation';

function SearchForm({ onSubmit }) {
  const {
    // eslint-disable-next-line no-unused-vars
    values, setValues, handleChangeInput, errors, isValid, resetFrom,
  } = useFormWithValidation();

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
                minLength="2"
              />
              <button
                className="search-form__submit"
                type="submit"
                disabled={!isValid}
                aria-label="кнопка найти"
              />
            </div>
          </section>
          <section className="search-form__input-section">
            <div className="search-form__input-wrapper">
              <label className="search-form__input-label search-form__input-label_checkbox" htmlFor="isShortFilms">
                <input
                  className="search-form__checkbox-short-films search-form__checkbox-short-films_invisible"
                  value="true"
                  id="isShortFilms"
                  type="checkbox"
                  name="isShortFilms"
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
};

export default SearchForm;
