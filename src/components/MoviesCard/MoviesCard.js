/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
/* eslint-disable no-unused-expressions */
import React from 'react';
import './MoviesCard.css';
import PropTypes from 'prop-types';
import Button from '../Ui/Button/Button';

function MoviesCard({
  cardType, isFavourite, name, duration, image, trailerLink,
}) {
  const [isCardAddedToFavourites, setIsCardAddedToFavourites] = React.useState(isFavourite);

  function converseDurationToString(num) {
    let minutes;
    const stringNum = String(num);
    /\d*[1]$/.test(stringNum) ? minutes = 'минута' : ''; // последняя цифра - 1 минутА
    /\d*[2-4]$/.test(stringNum) ? minutes = 'минуты' : ''; // последняя цифра - 2-4 минуты
    /\d*[5-90]$/.test(stringNum) ? minutes = 'минут' : ''; // последняя цифра - 5-9 и 0 минут
    return minutes;
  }
  const stringDuration = converseDurationToString(duration);

  function handleDefaultCard() {
    setIsCardAddedToFavourites(!isCardAddedToFavourites);
  }

  function handleClickCard(evt) {
    const image = evt.target.dataset.clickCatcher;
    // if (image)
  }

  return (
    <li className="movies-card" onClick={handleClickCard}>
      <figure className="movies-card__content">
        <figcaption className="movies-card__figcaption">
          <h2 className="movies-card__title" title={name}>{name}</h2>
          <p className="movies-card__duration" title={`${duration} ${stringDuration}`}>{`${duration} ${stringDuration}`}</p>
        </figcaption>
        <div className="movies-card__image-wrapper">
          <a className="movies-card__link" href={trailerLink} target="_blank" rel="noreferrer">
            <img className="movies-card__image" src={image} alt={`картинка фильма ${name}`} data-click-catcher />
          </a>
        </div>
      </figure>
      <div className="movies-card__button-wrapper">
        {cardType === 'default' ? (
          <Button
            text={!isCardAddedToFavourites ? 'Сохранить' : ''}
            label="кнопка Сохранить"
            btnStyle={isCardAddedToFavourites ? 'added-to-fav-movie-card' : 'default-movie-card'}
            disabled={false}
            onClick={handleDefaultCard}
          />
        ) : (
          <Button
            text=""
            label="кнопка Удалить из избранного"
            btnStyle="delete-from-fav-movie-card"
            disabled={false}
            onClick={() => { }}
          />
        )}
      </div>
    </li>
  );
}

MoviesCard.propTypes = {
  cardType: PropTypes.oneOf(['default', 'saved']),
  isFavourite: PropTypes.bool,
  name: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  trailerLink: PropTypes.string.isRequired,
};

MoviesCard.defaultProps = {
  cardType: 'default',
  isFavourite: false,
};

export default MoviesCard;
