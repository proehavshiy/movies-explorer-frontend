/* eslint-disable react/no-array-index-key */
import React from 'react';
import './SkillFeed.css';
import PropTypes from 'prop-types';

function SkillFeed({ data }) {
  return (
    <ul className="skill-feed">
      {
        data.map((item, index) => (
          <li className="skill-feed__item" key={index}>{item}</li>
        ))
      }
      {/* <li className="skill-feed__item">HTML</li>
      <li className="skill-feed__item">CSS</li>
      <li className="skill-feed__item">JS</li>
      <li className="skill-feed__item">React</li>
      <li className="skill-feed__item">Git</li>
      <li className="skill-feed__item">Express.js</li>
      <li className="skill-feed__item">mongoDB</li> */}
    </ul>
  );
}

SkillFeed.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SkillFeed;
