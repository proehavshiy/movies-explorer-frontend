/* eslint-disable max-len */
import React from 'react';
import './AboutProject.css';
import SectionHeading from '../Ui/SectionHeading/SectionHeading';
import AboutProjectCard from '../AboutProjectCard/AboutProjectCard';
import Timeline from '../Timeline/Timeline';

function AboutProject() {
  return (
    <section className="section landing__about-project">
      <SectionHeading
        headingText="О проекте"
      />
      <div className="landing__card-wrapper">
        <AboutProjectCard
          heading="Дипломный проект включал 5 этапов"
          description="Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки."
        />
        <AboutProjectCard
          heading="На выполнение диплома ушло 5 недель"
          description="У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься."
        />
      </div>
      <div className="landing__timeline-wrapper">
        <Timeline
          data={[
            {
              time: '1 неделя',
              duty: 'Back-end',
            },
            {
              time: '4 недели',
              duty: 'Front-end',
            },
          ]}
        />
      </div>
    </section>
  );
}

export default AboutProject;
