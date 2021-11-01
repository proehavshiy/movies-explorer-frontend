import React from 'react';
import './Promo.css';
import PropTypes from 'prop-types';

function Promo({ headingText }) {
  return (
    <div className="landing__promo page__main-content-padding-top">
      <h1 className="landing__heading">
        {headingText}
      </h1>
    </div>
  );
}

Promo.propTypes = {
  headingText: PropTypes.string.isRequired,
};

export default Promo;
