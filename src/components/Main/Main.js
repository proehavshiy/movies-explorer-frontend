/* eslint-disable max-len */
import React from 'react';
import './Main.css';

import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
// import SectionHeading from '../Ui/SectionHeading/SectionHeading';
// import ContentHeading from '../Ui/ContentHeading/ContentHeading';
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
      <AboutMe />
    </div>
  );
}

export default Main;
