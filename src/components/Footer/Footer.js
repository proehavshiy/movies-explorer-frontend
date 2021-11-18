import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer page__animation">
      <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
      <div className="footer__content">
        <p className="footer__copyright">
          &copy;&nbsp;
          {new Date().getFullYear()}
        </p>
        <div className="footer__links">
          <a className="footer__link page__link" href="https://practicum.yandex.ru/" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="footer__link page__link" href="https://github.com/proehavshiy" target="_blank" rel="noreferrer">Github</a>
          <a className="footer__link page__link" href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
