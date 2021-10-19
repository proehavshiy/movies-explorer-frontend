import React from 'react';
import { Link } from 'react-router-dom';
import './NavTab.css';
import PropTypes from 'prop-types';

function NavTab({ links }) {
  return (
    <ul className="landing__nav">
      {
        links.map((link) => (
          <li className="landing__link-wrapper" key={link.id}>
            <Link className="landing__link" to={link.path}>
              {link.heading}
            </Link>
          </li>
        ))
      }
    </ul>
  );
}

NavTab.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default NavTab;
