/* eslint-disable max-len */
import React from 'react';
import './AboutProjectCard.css';
import PropTypes from 'prop-types';

function AboutProjectCard({ heading, description }) {
  return (
    <div className="about-project-card about-project-card_style_magrin">
      <h3 className="about-project-card__heading">
        {heading}
      </h3>
      <p className="about-project-card__description">
        {description}
      </p>
    </div>
  );
}

AboutProjectCard.propTypes = {
  heading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AboutProjectCard;
