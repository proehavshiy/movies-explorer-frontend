/* eslint-disable react/no-array-index-key */
import React from 'react';
import './SkillFeed.css';
import PropTypes from 'prop-types';

function SkillFeed({ data }) {
  return (
    <ul className="skill-feed">
      {
        data.map((item) => (
          <li className="skill-feed__item" key={item.id}>{item.skill}</li>
        ))
      }
    </ul>
  );
}

SkillFeed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    skill: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default SkillFeed;
