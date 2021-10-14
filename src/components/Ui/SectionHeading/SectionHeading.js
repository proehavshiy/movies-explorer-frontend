import React from 'react';
import PropTypes from 'prop-types';
import './SectionHeading.css';

function SectionHeading({ headingText }) {
  return (
    <h2 className="section__heading">
      {headingText}
    </h2>
  );
}

SectionHeading.propTypes = {
  headingText: PropTypes.string.isRequired,
};

export default SectionHeading;
