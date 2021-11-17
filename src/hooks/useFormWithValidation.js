/* eslint-disable no-useless-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
import React, { useCallback } from 'react';
import validator from 'validator';

// кастомный хук по управляемой валидации инпутов
function useFormWithValidation() {
  // хранилище инпут-значение
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [areAllInputsValid, setAreAllInputsValid] = React.useState({});
  const [numOfInputs, setNumOfInputs] = React.useState(null);
  const [isFormValid, setIsFormValid] = React.useState(false);
  // валидатор емейла
  const isEmailValid = (value) => validator.isEmail(value, {
    allow_utf8_local_part: false,
  });

  React.useEffect(() => {
    function checkVal(obj, num) {
      const valuess = Object.values(obj);
      if (valuess.length !== num) return false;

      return valuess.every((val) => val === true);
    }
    setIsFormValid(checkVal(areAllInputsValid, numOfInputs));
  }, [areAllInputsValid, numOfInputs]);

  // управлятор инпутами:
  // заполняет хранилище
  const handleChangeInput = useCallback(
    (evt) => {
      const input = evt.target;
      const { name } = input;
      const { value } = input;
      const { checked } = input;
      const { type } = input;
      let error = input.validationMessage;
      if (type === 'email') {
        if (isEmailValid(value)) {
          error = '';
        } else {
          error = input.validationMessage ? input.validationMessage : 'Введите email вида username@postname.country';
        }
      }
      // const isFormValid = input.closest('form').checkValidity();
      const isInputValid = input.validity.valid;
      // кол-во всех инпутов формы для валидации формы (без учета чекбокса)
      setNumOfInputs(Array.from(input.closest('form').elements).filter((v) => {
        const input2 = v.nodeName === 'INPUT' && v.name !== 'isShortFilms';
        return input2;
      }).length);
      console.log('numOfInputs:', numOfInputs);
      // записываем поле-значение
      if (type === 'checkbox') {
        setValues((prevState) => ({
          ...prevState,
          [name]: checked,
        }));
      } else {
        setValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
      // записываем ошибки
      setErrors((prevState) => ({
        ...prevState,
        [name]: error,
      }));
      // записываем валидность всех инпутов
      if (type === 'email') {
        setAreAllInputsValid((prevState) => ({
          ...prevState,
          [name]: isEmailValid(value),
        }));
      } else if (type === 'checkbox') {
        return;
      } else {
        setAreAllInputsValid((prevState) => ({
          ...prevState,
          [name]: isInputValid,
        }));
      }
    }, [setValues, setAreAllInputsValid, areAllInputsValid],
  );

  // сброс ошибок
  const resetFrom = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
    },
    [setValues, setErrors, setIsFormValid],
  );

  return {
    values, setValues, handleChangeInput, errors, isFormValid, resetFrom,
  };
}

export default useFormWithValidation;
