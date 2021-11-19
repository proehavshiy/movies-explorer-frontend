import React from 'react';
import './Main.css';
import PropTypes from 'prop-types';
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

function Main({ staticContent }) {
  const {
    headingText, navTabSection, aboutProjectSection, techsSection, aboutMeSection,
  } = staticContent;

  return (
    <main className="landing page__main-content page__animation">
      <Promo
        headingText={headingText}
      />
      <NavTab
        links={navTabSection.links}
      />
      <AboutProject
        sectionHeading={aboutProjectSection.sectionHeading}
        cards={aboutProjectSection.cards}
        timeline={aboutProjectSection.timeline}
      />
      <Techs
        sectionHeading={techsSection.sectionHeading}
        contentHeading={techsSection.contentHeading}
        description={techsSection.description}
        skills={techsSection.skills}
      />
      <AboutMe
        sectionHeading={aboutMeSection.sectionHeading}
        personBio={aboutMeSection.personBio}
        personalLinks={aboutMeSection.personalLinks}
        avatar={aboutMeSection.avatar}
        portfolio={aboutMeSection.portfolio}
      />
    </main>
  );
}

Main.propTypes = {
  staticContent: PropTypes.shape({
    headingText: PropTypes.string.isRequired,
    navTabSection: PropTypes.shape({
      links: PropTypes.arrayOf(PropTypes.shape({
        heading: PropTypes.string.isRequired,
        path: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })).isRequired,
    }).isRequired,
    aboutProjectSection: PropTypes.shape({
      sectionHeading: PropTypes.string.isRequired,
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
    }).isRequired,
    techsSection: PropTypes.shape({
      sectionHeading: PropTypes.string.isRequired,
      contentHeading: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      skills: PropTypes.arrayOf(PropTypes.shape({
        skill: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })).isRequired,
    }).isRequired,
    aboutMeSection: PropTypes.shape({
      sectionHeading: PropTypes.string.isRequired,
      personBio: PropTypes.shape({
        name: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        aboutMe: PropTypes.string.isRequired,
      }).isRequired,
      personalLinks: PropTypes.arrayOf(PropTypes.shape({
        socialNetwork: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })).isRequired,
      avatar: PropTypes.string.isRequired,
      portfolio: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

export default Main;
