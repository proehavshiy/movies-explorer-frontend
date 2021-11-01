/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './NavTab.css';
import PropTypes from 'prop-types';

function NavTab({ links }) {
  // настройки скролла к блоку по клику по ссылке
  function scrollIntoView(el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
  return (
    <ul className="landing__nav">
      {
        links.map((link) => (
          <li className="landing__link-wrapper" key={link.id}>
            <HashLink className="landing__link page__link" to={link.path} scroll={scrollIntoView}>
              {link.heading}
            </HashLink>
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
