import React from 'react';
import './AboutProject.css';
import PropTypes from 'prop-types';
import SectionHeading from '../Ui/SectionHeading/SectionHeading';
import AboutProjectCard from '../AboutProjectCard/AboutProjectCard';
import Timeline from '../Timeline/Timeline';

function AboutProject({ sectionHeading, cards, timeline }) {
  return (
    <section className="section landing__about-project" id="aboutProject">
      <SectionHeading
        headingText={sectionHeading}
      />
      <div className="landing__card-wrapper">
        {
          cards.map((card) => (
            <AboutProjectCard
              key={card.id}
              heading={card.heading}
              description={card.description}
            />
          ))
        }
      </div>
      <div className="landing__timeline-wrapper">
        <Timeline
          data={timeline}
        />
      </div>
    </section>
  );
}

AboutProject.propTypes = {
  sectionHeading: PropTypes.string,
  cards: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  timeline: PropTypes.arrayOf(PropTypes.shape({
    time: PropTypes.string.isRequired,
    duty: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};

AboutProject.defaultProps = {
  sectionHeading: 'О проекте',
};

export default AboutProject;
