import React from 'react';
import PropTypes from 'prop-types';
import './FormFieldset.css';

function FormFieldset({ inputs }) {
  return (
    <fieldset className="fieldset">
      {inputs.map((input) => {
        const {
          labelName,
          inputName,
          inputType,
          onChange,
          inputValue = '',
          error = '',
          id,
          isRequired = true,
          minLength = null,
          maxLength = null,
        } = input;
        return (
          <section className="fieldset__input-section" key={id}>
            <label className="fieldset__input-label" htmlFor={inputName}>
              {labelName}
            </label>
            <input
              className="fieldset__input"
              value={inputValue}
              onChange={onChange}
              id={inputName}
              type={inputType}
              name={inputName}
              required={isRequired}
              minLength={minLength}
              maxLength={maxLength}
            />
            <span className={`fieldset__input-error ${error && 'fieldset__input-error_active'}`}>
              {error}
            </span>
          </section>
        );
      })}
    </fieldset>
  );
}

FormFieldset.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.shape({
    labelName: PropTypes.string.isRequired,
    inputName: PropTypes.string.isRequired,
    inputType: PropTypes.oneOf([
      'text',
      'checkbox',
      'color',
      'date',
      'datetime',
      'datetime-local',
      'email',
      'file',
      'hidden',
      'month',
      'number',
      'password',
      'radio',
      'range',
      'search',
      'tel',
      'time',
      'url',
      'week',
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    inputValue: PropTypes.string,
    error: PropTypes.string,
    isRequired: PropTypes.bool,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
  })).isRequired,
};

export default FormFieldset;
