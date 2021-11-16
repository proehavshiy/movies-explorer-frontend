/* eslint-disable no-unused-vars */
import React from 'react';
import STATUS_MESSAGES from '../config/staticPageContent/statusMessages';

// открыватель попапа

function useInfoPopupSettings() {
  const [infoPopupSettings, setInfoPopupSettings] = React.useState({});

  const openInfoPopup = React.useCallback(
    (reqType = 'default', reqResult = 'error', reqStatusCode = 'defaultMessage') => {
      const phrase = reqStatusCode === '500'
        ? STATUS_MESSAGES.default.error
        : STATUS_MESSAGES[reqType][reqResult][reqStatusCode];

      setInfoPopupSettings({
        type: reqResult,
        isOpened: true,
        heading: phrase,
      });
    }, [setInfoPopupSettings],
  );

  function closeInfoPopup() {
    setInfoPopupSettings({});
  }

  return {
    infoPopupSettings, closeInfoPopup, openInfoPopup,
  };
}
// function openInfoPopup(fetchType, result, statusCode) {
//   const phrase = statusCode === '500'
//     ? STATUS_MESSAGES.default.error
//     : STATUS_MESSAGES[fetchType][result][statusCode];
//   setInfoToolTipStatus({
//     type: result,
//     isOpened: true,
//     heading: phrase,
//   });
// }

export default useInfoPopupSettings;
