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
  skills: PropTypes.arrayOf(PropTypes.string),
};

Techs.defaultProps = {
  skills: [
    'HTML', 'CSS', 'JS', 'React', 'Git',
  ],
};

export default Techs;
