/* eslint-disable max-len */
import React from 'react';
import './Main.css';

import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
// import AboutProject from '../AboutProject/AboutProject';
// import Techs from '../Techs/Techs';
// import AboutMe from '../AboutMe/AboutMe';
// import Portfolio from '../Portfolio/Portfolio';

function Main() {
  return (
    <div className="landing">
      <Promo />
      <NavTab />
      <div className="landing__about-project">
        <h2 className="landing__about-project-heading">
          О проекте
        </h2>
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
      </div>
      {/* <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio /> */}
    </div>
  );
}

export default Main;
