/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
import React from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Ui/Button/Button';

function MoviesCardList({ typeOfList, cardsData, onCardButtonClick, onAddToFavourites, onRemoveFromFavourites }) {
  return (
    <section className="movies-card-list">
      <ul ul className="movies-card-list__cards-container">
        {
          cardsData.map((v, index, arr) => {
            // итерируем с конца в начало,
            // чтобы свежие добавленные фильмы были в начале
            const film = arr[arr.length - 1 - index];
            return (
              <MoviesCard
                key={film.id}
                cardType={typeOfList}
                // isFavourite={film.isFavourite}
                name={film.nameRU}
                duration={film.duration}
                image={typeOfList === 'default' ? `https://api.nomoreparties.co${film.image.url}` : film.image}
                trailerLink={typeOfList === 'default' ? film.trailerLink : film.trailer}
                // onCardButtonClick={onCardButtonClick}
                onAddToFavourites={onAddToFavourites}
                onRemoveFromFavourites={onRemoveFromFavourites}
                id={film._id}
              />
            );
          })
        }
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
  onCardButtonClick: PropTypes.func.isRequired,
};

MoviesCardList.defaultProps = {
  typeOfList: 'default',
};

export default MoviesCardList;
