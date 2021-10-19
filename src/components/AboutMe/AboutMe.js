import React from 'react';
import './AboutMe.css';
import PropTypes from 'prop-types';
import SectionHeading from '../Ui/SectionHeading/SectionHeading';
import ContentHeading from '../Ui/ContentHeading/ContentHeading';
import Portfolio from '../Portfolio/Portfolio';

function AboutMe({
  sectionHeading, personBio, personalLinks, avatar, portfolio,
}) {
  const { name, position, aboutMe } = personBio;
  return (
    <section className="section about-me">
      <SectionHeading
        headingText={sectionHeading}
      />
      <div className="about-me__content-wrapper">
        <section className="about-me__bio">
          <div className="about-me__profile">
            <ContentHeading
              headingText={name}
            />
            <h4 className="about-me__position">
              {position}
            </h4>
            <p className="about-me__article">
              {aboutMe}
            </p>
            <ul className="about-me__personal-links-container">
              {
                personalLinks.map((item) => (
                  <li className="about-me__personal-link-wrapper" key={item.id}>
                    <a className="about-me__personal-link" href={item.link}>
                      {item.socialNetwork}
                    </a>
                  </li>
                ))
              }
            </ul>
          </div>
          <figure className="about-me__photo-wrapper">
            <img className="about-me__photo" src={avatar} alt="аватар разработчика" />
          </figure>
        </section>
        <Portfolio
          data={portfolio}
        />
      </div>
    </section>
  );
}

AboutMe.propTypes = {
  sectionHeading: PropTypes.string,
  personBio: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    aboutMe: PropTypes.string.isRequired,
  }),
  personalLinks: PropTypes.arrayOf(PropTypes.shape({
    socialNetwork: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  avatar: PropTypes.string,
  portfolio: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
};

AboutMe.defaultProps = {
  sectionHeading: 'Студент',
  personBio: {
    name: 'Виталий',
    position: 'Фронтенд-разработчик, 30 лет',
    aboutMe: `Я родился и живу в Саратове, закончил факультет экономики СГУ.
    У меня есть жена и дочь.Я люблю слушать музыку, а ещё увлекаюсь бегом.Недавно начал кодить.
    С 2015 года работал в компании «СКБ Контур».После того, как прошёл курс по веб- разработке,
    начал заниматься фриланс- заказами и ушёл с постоянной работы.`,
  },
  personalLinks: [
    { socialNetwork: 'Facebook', link: 'https://www.facebook.com/', id: 1 },
    { socialNetwork: 'Github', link: 'https://github.com/', id: 2 },
  ],
  avatar: 'https://www.allthetests.com/quiz22/picture/pic_1171831236_1.png',
  portfolio: [
    {
      name: 'Статичный сайт',
      link: 'http://example.com/',
      id: 1,
    },
    {
      name: 'Адаптивный сайт',
      link: 'http://example.com/',
      id: 2,
    },
    {
      name: 'Одностраничное приложение',
      link: 'http://example.com/',
      id: 3,
    },
  ],
};

export default AboutMe;
