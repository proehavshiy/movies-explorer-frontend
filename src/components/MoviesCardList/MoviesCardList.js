/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Ui/Button/Button';

function MoviesCardList({ typeOfList, cardsData }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards-container">
        {cardsData.map((film) => (
          <MoviesCard
            key={film.id}
            cardType={typeOfList}
            isFavourite={film.isFavourite}
            name={film.name}
            duration={film.duration}
            image={film.image}
          />
        ))}
      </ul>
      {typeOfList === 'default' && (
        <div className="movies-card-list__button-container">
          <Button
            text="Ещё"
            label="кнопка Загрузить больше карточек"
            btnStyle="load-more-cards"
            disabled={false}
            onClick={() => { }}
          />
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
