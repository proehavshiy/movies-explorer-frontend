/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
import React from 'react';
import './MoviesCard.css';
import PropTypes from 'prop-types';

function MoviesCard({
  cardType, name, duration, image,
}) {
  function converseDurationToString(num) {
    let minutes;
    const stringNum = String(num);
    /\d*[1]$/.test(stringNum) ? minutes = 'минута' : ''; // последняя цифра - 1 минутА
    /\d*[2-4]$/.test(stringNum) ? minutes = 'минуты' : ''; // последняя цифра - 2-4 минуты
    /\d*[5-90]$/.test(stringNum) ? minutes = 'минут' : ''; // последняя цифра - 5-9 и 0 минут
    return minutes;
  }
  const stringDuration = converseDurationToString(duration);

  return (
    <li className="movies-card">
      <figure className="movies-card__content">
        <figcaption className="movies-card__figcaption">
          <h2 className="movies-card__title" title={name}>{name}</h2>
          <p className="movies-card__duration" title={`${duration} ${stringDuration}`}>{`${duration} ${stringDuration}`}</p>
        </figcaption>
        <img className="movies-card__image" src={image} alt={`картинка фильма ${name}`} />
      </figure>
      <div className="movies-card__button-wrapper">
        {cardType === 'default' ? (
          <button className="movies-card__button movies-card__button_movie-default page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
        ) : (
          <button className="movies-card__button movies-card__button_movie-delete page__button" type="button" aria-label="кнопка Удалить из избранного" />
        )}
      </div>
    </li>
  );
}

MoviesCard.propTypes = {
  cardType: PropTypes.oneOf(['default', 'saved']),
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

MoviesCard.defaultProps = {
  cardType: 'default',
};

export default MoviesCard;
