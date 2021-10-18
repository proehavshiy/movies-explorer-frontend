/* eslint-disable max-len */
import React from 'react';
import './Main.css';

import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
// import SectionHeading from '../Ui/SectionHeading/SectionHeading';
// import ContentHeading from '../Ui/ContentHeading/ContentHeading';
// import AboutProject from '../AboutProject/AboutProject';
// import Techs from '../Techs/Techs';
// import AboutMe from '../AboutMe/AboutMe';
// import Portfolio from '../Portfolio/Portfolio';

function Main() {
  return (
    <div className="landing">
      <Promo
        headingText="Учебный проект студента факультета Веб-разработки."
      />
      <NavTab
        links={{
          link1: {
            heading: 'О проекте',
            path: '/',
          },
          link2: {
            heading: 'Технологии',
            path: '/',
          },
          link3: {
            heading: 'Студент',
            path: '/',
          },
        }}
      />
      <AboutProject />
      <Techs
        sectionHeading="Технологии"
        contentHeading="7 технологи"
        description="На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте."
        skills={[
          'HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB',
        ]}
      />
      {/* <section className="section landing__about-me">
        <SectionHeading
          headingText="Студент"
        />
        <div className="landing__about-me-content-wrapper">
          <div className="landing__about-me-bio">
            <div className="landing__about-me-bio-left">
              <ContentHeading
                headingText="Виталий"
              />
              <p>
                Фронтенд-разработчик, 30 лет
              </p>
              <p>
                Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
              </p>
              <ul className="landing__about-me-bio-left-personal-links">
                <li className="landing__about-me-bio-left-personal-link-container">
                  <a className="landing__about-me-bio-left-personal-link" href="http://htmlbook.ru/">
                    Facebook
                  </a>
                </li>
                <li className="landing__about-me-bio-left-personal-link-container">
                  <a className="landing__about-me-bio-left-personal-link" href="http://htmlbook.ru/">
                    Github
                  </a>
                </li>
              </ul>
            </div>
            <figure className="landing__about-me-bio-right">
              <img className="landing__about-me-bio-right-image" src="https://fdlx.com/wp-content/uploads/ABOBA.jpg" alt="картинка студента" />
            </figure>
          </div>
          <div className="landing__about-me-portfolio">
            <h4 className="landing__about-me-portfolio-heading">
              Портфолио
            </h4>
            <ul className="landing__about-me-portfolio-works">
              <li className="landing__about-me-portfolio-work">
                <a className="landing__about-me-portfolio-link" href="http://htmlbook.ru/">
                  <p className="landing__about-me-portfolio-link-text">
                    Статичный сайт
                  </p>
                </a>
              </li>
              <li className="landing__about-me-portfolio-work">
                <a className="landing__about-me-portfolio-link" href="http://htmlbook.ru/">
                  <p className="landing__about-me-portfolio-link-text">
                    Адаптивный сайт
                  </p>
                </a>
              </li>
              <li className="landing__about-me-portfolio-work">
                <a className="landing__about-me-portfolio-link" href="http://htmlbook.ru/">
                  <p className="landing__about-me-portfolio-link-text">
                    Одностраничное приложение
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default Main;
