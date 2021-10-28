import React from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ typeOfList, cardsData }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards-container">
        {cardsData.map((film) => (
          <MoviesCard
            key={film.id}
            cardType={film.status}
            name={film.name}
            duration={film.duration}
            image={film.image}
          />
        ))}
      </ul>
      {typeOfList === 'default' && (
        <div className="movies-card-list__button-container">
          <button className="movies-card__button movies-card__button_load-more-cards page__button" type="button" aria-label="кнопка Загрузить больше карточек">Ещё</button>
        </div>
      )}
    </section>
  );
}

MoviesCardList.propTypes = {
  typeOfList: PropTypes.oneOf(['default', 'saved']),
  cardsData: PropTypes.arrayOf(PropTypes.any).isRequired,
};

MoviesCardList.defaultProps = {
  typeOfList: 'default',
};

export default MoviesCardList;
