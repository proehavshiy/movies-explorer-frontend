/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
/* eslint-disable semi */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
import React, { useCallback } from 'react';
import validator from 'validator';

// кастомный хук по управляемой валидации инпутов
function useFormWithValidation() {
  // хранилище инпут-значение
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [areAllInputsValid, setAreAllInputsValid] = React.useState({});
  const [numOfInputs, setNumOfInputs] = React.useState(null);
  const [isValid, setIsValid] = React.useState(false);
  // const isEmailValid = (value) => validator.isEmail(value, {
  //   allow_utf8_local_part: false,
  // })
  const isEmailValid = (value) => validator.isEmail(value)
  console.log('render:');

  // const checkVal = useCallback(
  //   (obj, num) => {
  //     const valuess = Object.values(obj)
  //     if (valuess.length !== num) return false;

  //     return valuess.every((val) => val === true)
  //     // console.log('values:', values);
  //   },
  // )

  React.useEffect(() => {
    const checkVal = (obj, num) => {
      const valuess = Object.values(obj)
      if (valuess.length !== num) return false;

      return valuess.every((val) => val === true)
      // console.log('values:', values);
    }
    setIsValid(checkVal(areAllInputsValid, numOfInputs))
    console.log('isValid:', isValid);
  }, [areAllInputsValid]);

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
          error = input.validationMessage ? input.validationMessage : 'Введите email вида username@postname.country'
        }
      }
      // const isFormValid = input.closest('form').checkValidity();
      const isInputValid = input.validity.valid;
      // кол-во всех инпутов формы
      setNumOfInputs(Array.from(input.closest('form').elements).filter((v) => v.nodeName === 'INPUT').length)
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
      } else {
        setAreAllInputsValid((prevState) => ({
          ...prevState,
          [name]: isInputValid,
        }));
      }
      // setAreAllInputsValid((prevState) => ({
      //   ...prevState,
      //   [name]: isEmailValid(value),
      //   [name]: isInputValid,
      // }));
      console.log('areAllInputsValid:', areAllInputsValid);
      // checkVal(areAllInputsValid, numOfInputs);
      // console.log('checkVal(areAllInputsValid);:', checkVal(areAllInputsValid, numOfInputs));
      // ставим валидность всей форме
      // const val = checkVal(areAllInputsValid, numOfInputs)
      // console.log('val:', val);
      // setIsValid(val)
      // console.log('setIsValid:', isValid);

      // setIsValid(() => {
      //   for (value of areAllInputsValid) {
      //     console.log('value:', value);
      //   }
      // })
    }, [setValues, setAreAllInputsValid, areAllInputsValid, setIsValid, isValid],
  );

  // сброс ошибок
  const resetFrom = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return {
    values, setValues, handleChangeInput, errors, isValid, resetFrom,
  };
}

export default useFormWithValidation;
