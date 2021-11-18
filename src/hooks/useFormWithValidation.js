/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
import React, { useCallback, useState } from 'react';
import validator from 'validator';

// кастомный хук по управляемой валидации инпутов
function useFormWithValidation() {
  // хранилище инпут-значение
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [areAllInputsValid, setAreAllInputsValid] = useState({});
  const [numOfInputs, setNumOfInputs] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);

  // валидатор емейла
  const isEmailValid = (value) => validator.isEmail(value, {
    allow_utf8_local_part: false,
  });

  // определение валидности всей формы
  React.useEffect(() => {
    // проверяет, все ли инпуты в форме валидны
    function checkFormValidity(objOfInputsValidity, inputsNum) {
      if (typeof objOfInputsValidity !== 'object') return;
      if (typeof inputsNum !== 'number') return;

      const validities = Object.values(objOfInputsValidity);
      if (validities.length !== inputsNum) return false;
      return validities.every((val) => val === true);
    }
    // обновляется стейт валидации формы
    setIsFormValid(checkFormValidity(areAllInputsValid, numOfInputs));
  }, [areAllInputsValid, numOfInputs]);

  // управлятор инпутами:
  // заполняет хранилище
  const handleChangeInput = useCallback(
    (evt) => {
      const input = evt.target;
      const { name } = input;
      const { value } = input;
      const { type } = input;
      // установка сообщения об ошибке
      // для всех - дефолтная, для емейла -
      // смесь дефолтной с кастомной в зависимости от проверки через validator
      let error = input.validationMessage;
      if (type === 'email') {
        if (isEmailValid(value)) {
          error = '';
        } else {
          error = input.validationMessage ? input.validationMessage : 'Введите email вида username@mail.com';
        }
      }
      // const isFormValid = input.closest('form').checkValidity();
      const isInputValid = input.validity.valid;
      // кол-во всех инпутов формы для валидации формы без учета чекбоксов
      setNumOfInputs(Array.from(input.closest('form').elements).filter((v) => v.nodeName === 'INPUT' && v.type !== 'checkbox').length);
      // записываем поле-значение
      setValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      // записываем ошибки
      setErrors((prevState) => ({
        ...prevState,
        [name]: error,
      }));
      // записываем валидность всех инпутов
      // для емейла - кастомная валидация
      // для чекбокса - отключаем
      // для всех остальных - стандартная
      if (type === 'email') {
        setAreAllInputsValid((prevState) => ({
          ...prevState,
          [name]: isEmailValid(value),
        }));
      } else {
        setAreAllInputsValid((prevState) => ({
          ...prevState,
          [name]: isInputValid,
        }));
      }
    }, [setValues, setAreAllInputsValid, areAllInputsValid],
  );

  // установка кастомного начального сосотояния формы
  const resetFrom = useCallback(
    (newValues = {}, newErrors = {}, newIsFormValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
      // ставим изначальное значение валидности каждому полю
      setAreAllInputsValid(Object.keys(newValues).reduce((acc, curr) => {
        acc[curr] = true;
        return acc;
      }, {}));
      // указываем начальное кол-во полей
      setNumOfInputs(Object.keys(newValues).length);
    },
    [setValues, setErrors, setIsFormValid],
  );

  return {
    values, setValues, handleChangeInput, errors, isFormValid, resetFrom,
  };
}

export default useFormWithValidation;
