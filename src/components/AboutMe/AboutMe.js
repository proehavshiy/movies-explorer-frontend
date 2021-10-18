/* eslint-disable max-len */
import React from 'react';
import './AboutMe.css';
import SectionHeading from '../Ui/SectionHeading/SectionHeading';
import ContentHeading from '../Ui/ContentHeading/ContentHeading';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe() {
  return (
    <section className="section about-me">
      <SectionHeading
        headingText="Студент"
      />
      <div className="about-me__content-wrapper">
        <section className="about-me__bio">
          <div className="about-me__profile">
            <ContentHeading
              headingText="Виталий"
            />
            <h4 className="about-me__position">
              Фронтенд-разработчик, 30 лет
            </h4>
            <p className="about-me__article">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <ul className="about-me__personal-links-container">
              <li className="about-me__personal-link-wrapper">
                <a className="about-me__personal-link" href="http://htmlbook.ru/">
                  Facebook
                </a>
              </li>
              <li className="about-me__personal-link-wrapper">
                <a className="about-me__personal-link" href="http://htmlbook.ru/">
                  Github
                </a>
              </li>
            </ul>
          </div>
          <figure className="about-me__photo-wrapper">
            <img className="about-me__photo" src="https://fdlx.com/wp-content/uploads/ABOBA.jpg" alt="картинка студента" />
          </figure>
        </section>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
