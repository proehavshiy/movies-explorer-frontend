import React from 'react';
import PropTypes from 'prop-types';
import './ContentHeading.css';

function ContentHeading({ headingText, isCenterAlign }) {
  return (
    <h3 className={`section__content-heading ${isCenterAlign && 'section__content-heading_text-align-center'}`}>
      {headingText}
    </h3>
  );
}

ContentHeading.propTypes = {
  headingText: PropTypes.string.isRequired,
  isCenterAlign: PropTypes.bool,
};

ContentHeading.defaultProps = {
  isCenterAlign: false,
};

export default ContentHeading;
