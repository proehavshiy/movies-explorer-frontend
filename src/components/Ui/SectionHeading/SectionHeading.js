import React from 'react';
import PropTypes from 'prop-types';
import './SectionHeading.css';

function SectionHeading({ headingText }) {
  return (
    <h2 className="landing__section-heading landing__section-heading_style_border-bottom">
      {headingText}
    </h2>
  );
}

SectionHeading.propTypes = {
  headingText: PropTypes.string.isRequired,
};

export default SectionHeading;
