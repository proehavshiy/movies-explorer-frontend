/* eslint-disable max-len */
import React from 'react';
import './Main.css';

import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import SectionHeading from '../SectionHeading/SectionHeading';
// import AboutProject from '../AboutProject/AboutProject';
// import Techs from '../Techs/Techs';
// import AboutMe from '../AboutMe/AboutMe';
// import Portfolio from '../Portfolio/Portfolio';

function Main() {
  return (
    <div className="landing">
      <Promo />
      <NavTab />
      <section className="section landing__about-project">
        <SectionHeading
          headingText="О проекте"
        />
        <div className="landing__about-project-card-wrapper">
          <ul className="landing__about-project-card">
            <li>
              <h3 className="landing__about-project-card-heading">
                Дипломный проект включал 5 этапов
              </h3>
              <p className="landing__about-project-card-text">
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
              </p>
            </li>
          </ul>
          <ul className="landing__about-project-card">
            <li>
              <h3 className="landing__about-project-card-heading">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="landing__about-project-card-text">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
              </p>
            </li>
          </ul>
        </div>
        <div className="landing__about-project-timeline-wrapper">
          <p className="landing__about-project-timeline landing__about-project-timeline_1">1 неделя</p>
          <p className="landing__about-project-timeline landing__about-project-timeline_2">4 недели</p>
          <p className="landing__about-project-timeline landing__about-project-timeline_3">Back-end</p>
          <p className="landing__about-project-timeline landing__about-project-timeline_4">Front-end</p>
        </div>
      </section>
      <section className="section landing__techs">
        <SectionHeading
          headingText="Технологии"
        />
        <div className="landing__techs-content-wrapper">
          <div className="landing__techs-text">
            <h3 className="landing__techs-title">
              7 технологий
            </h3>
            <p className="landing__techs-subtitle">
              На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
            </p>
          </div>
          <ul className="landing__techs-items-block">
            <li className="landing__techs-item">HTML</li>
            <li className="landing__techs-item">CSS</li>
            <li className="landing__techs-item">JS</li>
            <li className="landing__techs-item">React</li>
            <li className="landing__techs-item">Git</li>
            <li className="landing__techs-item">Express.js</li>
            <li className="landing__techs-item">mongoDB</li>
          </ul>
        </div>
      </section>
      {/* <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio /> */}
    </div>
  );
}

export default Main;
