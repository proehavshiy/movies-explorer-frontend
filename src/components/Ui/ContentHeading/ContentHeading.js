import React from 'react';
import PropTypes from 'prop-types';
import './ContentHeading.css';

function ContentHeading({ headingText }) {
  return (
    <h3 className="landing__content-heading">
      {headingText}
    </h3>
  );
}

ContentHeading.propTypes = {
  headingText: PropTypes.string.isRequired,
};

export default ContentHeading;
