import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';
import PropTypes from 'prop-types';

function NavTab({ links }) {
  return (
    <ul className="landing__nav">
      <li className="landing__link-wrapper">
        <Link className="landing__link" to={links.link1.path}>
          {links.link1.heading}
        </Link>
      </li>
      <li className="landing__link-wrapper">
        <Link className="landing__link" to={links.link2.path}>
          {links.link2.heading}
        </Link>
      </li>
      <li className="landing__link-wrapper">
        <Link className="landing__link" to={links.link2.path}>
          {links.link3.heading}
        </Link>
      </li>
    </ul>
  );
}

NavTab.propTypes = {
  links: PropTypes.shape({
    link1: {
      heading: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    },
    link2: {
      heading: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    },
    link3: {
      heading: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    },
  }).isRequired,
};

export default NavTab;
