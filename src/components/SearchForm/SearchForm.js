/* eslint-disable no-unused-vars */
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

  // если необходимо, чтобы сохранилось значение поиска и чекбокса,
  // то нужно передать initialInputValue в валидацию, а isChecked в useeffect
  // isChecked в валидацию не вносим, чтобы он не влиял на валидацию
  const [checkboxValue, setCheckboxValue] = React.useState(isChecked);
  const checkboxRef = React.useRef();

  React.useEffect(() => {
    checkboxRef.current.checked = isChecked;
  }, [isChecked]);

  React.useEffect(() => {
    resetFrom({
      search: initialInputValue,
    }, {}, true);
  }, [initialInputValue, resetFrom]);

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
                  ref={checkboxRef}
                  onChange={setCheckboxValue}
                  value={checkboxValue}
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
