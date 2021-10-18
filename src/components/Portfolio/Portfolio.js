import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className="portfolio">
      <h4 className="portfolio__heading">
        Портфолио
      </h4>
      <ul className="portfolio__list">
        <li className="portfolio__link-wrapper">
          <a className="portfolio__link" href="http://htmlbook.ru/">
            <p className="portfolio__name">
              Статичный сайт
            </p>
          </a>
        </li>
        <li className="portfolio__link-wrapper">
          <a className="portfolio__link" href="http://htmlbook.ru/">
            <p className="portfolio__name">
              Адаптивный сайт
            </p>
          </a>
        </li>
        <li className="portfolio__link-wrapper">
          <a className="portfolio__link" href="http://htmlbook.ru/">
            <p className="portfolio__name">
              Одностраничное приложение
            </p>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
