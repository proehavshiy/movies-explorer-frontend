import React from 'react';
import STATUS_MESSAGES from '../config/staticPageContent/statusMessages';

// управление попапом
function useInfoPopupSettings() {
  const [infoPopupSettings, setInfoPopupSettings] = React.useState({});

  function checkParametersDefiniteness(array) {
    return array.every((item) => !Object.is(item, null || undefined));
  }

  const openInfoPopup = React.useCallback(
    (reqType, reqResult, reqStatusCode) => {
      // если хотя бы один параметр не определен, вызываем попап с дефолтной ошибкой
      if (!checkParametersDefiniteness([reqType, reqResult, reqStatusCode])) {
        setInfoPopupSettings({
          type: 'error',
          isOpened: true,
          heading: STATUS_MESSAGES.default.error.message,
        });
      } else {
        setInfoPopupSettings({
          type: reqResult,
          isOpened: true,
          heading: STATUS_MESSAGES[reqType][reqResult][reqStatusCode],
        });
      }
    }, [setInfoPopupSettings],
  );

  function closeInfoPopup() {
    setInfoPopupSettings({});
  }

  return {
    infoPopupSettings, closeInfoPopup, openInfoPopup,
  };
}

export default useInfoPopupSettings;
