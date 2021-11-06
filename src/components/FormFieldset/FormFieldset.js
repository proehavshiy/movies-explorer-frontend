/* eslint-disable max-len */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import './FormFieldset.css';

function FormFieldset({ inputs }) {
  return (
    <fieldset className="fieldset">
      {inputs.map((input) => {
        const {
          inputStyle,
          labelName,
          inputName,
          inputType,
          onChange,
          inputValue = '',
          error = '',
          id,
          placeholder = '',
          isRequired = true,
          minLength = null,
          maxLength = null,
        } = input;
        return (
          <section className={`fieldset__input-section fieldset__input-section_style_${inputStyle}`} key={id}>
            <div className={`fieldset__input-wrapper fieldset__input-wrapper_style_${inputStyle}`}>
              <label className={`fieldset__input-label fieldset__input-label_style_${inputStyle}`} htmlFor={inputName}>
                {labelName}
              </label>
              <input
                className={`fieldset__input fieldset__input_style_${inputStyle}`}
                value={inputValue}
                onChange={onChange}
                id={inputName}
                type={inputType}
                name={inputName}
                placeholder={placeholder}
                required={isRequired}
                minLength={minLength}
                maxLength={maxLength}
              />
            </div>
            <span className={`fieldset__input-error fieldset__input-error_style_${inputStyle} ${error && 'fieldset__input-error_active'}`}>
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
    inputStyle: PropTypes.oneOf(['auth', 'profile']),
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
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
  })).isRequired,
};

export default FormFieldset;
