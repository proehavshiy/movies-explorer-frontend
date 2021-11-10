/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './InfoToolTip.css';
import PropTypes from 'prop-types';

function InfoToolTip({ settings, onClose }) {
  const { type, isOpened, heading } = settings;

  function handleClick(evt) {
    if (evt.target.dataset.closeCatcher) onClose();
  }

  if (type === 'success' && isOpened) {
    setTimeout(() => {
      onClose();
    }, 1500);
  }

  return (
    <div className={`info-tool-tip-wrapper ${isOpened && 'info-tool-tip-wrapper__opened'}`} onClick={handleClick} data-close-catcher>
      <div className="info-tool-tip">
        <div className="info-tool-tip__container">
          <button className="page__button info-tool-tip__button" type="button" aria-label="Кнопка Закрыть" data-close-catcher />
          <div className="info-tool-tip__content-wrapper">
            <div className={`info-tool-tip__image ${`info-tool-tip__image_type_${type}`}`} />
            <h2 className="info-tool-tip__heading">
              {heading}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

InfoToolTip.propTypes = {
  settings: PropTypes.shape({
    type: PropTypes.oneOf(['error', 'success']),
    isOpened: PropTypes.bool,
    heading: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

InfoToolTip.defaultProps = {
  settings: {
    type: 'error',
    isOpened: false,
    heading: 'Произошла ошибка. Попробуйте позже',
  },
};

export default InfoToolTip;
