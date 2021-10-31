import React from 'react';
import './Portfolio.css';
import PropTypes from 'prop-types';

function Portfolio({ heading, data }) {
  return (
    <section className="portfolio">
      <h4 className="portfolio__heading">
        {heading}
      </h4>
      <ul className="portfolio__list">
        {
          data.map((item) => (
            <li className="portfolio__link-wrapper page__link" key={item.id}>
              <a className="portfolio__link" href={item.link}>
                <p className="portfolio__name">
                  {item.name}
                </p>
              </a>
            </li>
          ))
        }
      </ul>
    </section>
  );
}

Portfolio.propTypes = {
  heading: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

Portfolio.defaultProps = {
  heading: 'Портфолио',
};

export default Portfolio;
