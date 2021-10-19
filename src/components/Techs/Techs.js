import React from 'react';
import './Techs.css';
import PropTypes from 'prop-types';
import SectionHeading from '../Ui/SectionHeading/SectionHeading';
import ContentHeading from '../Ui/ContentHeading/ContentHeading';
import SkillFeed from '../SkillFeed/SkillFeed';

function Techs({
  sectionHeading, contentHeading, description, skills,
}) {
  return (
    <div className="page__section page__section_background-color_grey">
      <section className="section techs">
        <SectionHeading
          headingText={sectionHeading}
        />
        <div className="techs__content-wrapper">
          <div className="techs__text">
            <ContentHeading
              headingText={contentHeading}
            />
            <p className="techs__subtitle">
              {description}
            </p>
          </div>
          <SkillFeed
            data={skills}
          />
        </div>
      </section>
    </div>
  );
}

Techs.propTypes = {
  sectionHeading: PropTypes.string.isRequired,
  contentHeading: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.shape({
    skill: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
};

Techs.defaultProps = {
  skills: [
    { skill: 'HTML', id: 1 },
    { skill: 'CSS', id: 2 },
    { skill: 'JS', id: 3 },
    { skill: 'React', id: 4 },
    { skill: 'Git', id: 5 },
  ],
};

export default Techs;
