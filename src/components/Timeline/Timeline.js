/* eslint-disable react/no-array-index-key */
import React from 'react';
import './Timeline.css';
import PropTypes from 'prop-types';

function Timeline({ data }) {
  return (
    <ul className="timeline">
      {data.map((col) => (
        <li className="timeline__col" key={col.id}>
          <p className="timeline__cell">{col.time}</p>
          <p className="timeline__cell">{col.duty}</p>
        </li>
      ))}
    </ul>
  );
}

Timeline.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.string.isRequired,
    duty: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default Timeline;
