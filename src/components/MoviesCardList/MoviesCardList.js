/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Ui/Button/Button';
import { BASE_URL } from '../../utils/MoviesApi';

function MoviesCardList({ typeOfList, cardsData, onAddToFavourites, onRemoveFromFavourites }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards-container">
        {
          cardsData.map((v, index, arr) => {
            // итерируем с конца в начало,
            // чтобы свежие добавленные фильмы были в начале
            const film = arr[arr.length - 1 - index];
            const key = typeOfList === 'default' ? film.id : film._id;
            const imageLink = typeOfList === 'default' ? `${BASE_URL}${film.image.url}` : film.image;
            const trailerLink = typeOfList === 'default' ? film.trailerLink : film.trailer;
            return (
              <MoviesCard
                key={key}
                cardType={typeOfList}
                name={film.nameRU}
                duration={film.duration}
                image={imageLink}
                trailerLink={trailerLink}
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
  onAddToFavourites: PropTypes.func,
  onRemoveFromFavourites: PropTypes.func.isRequired,
};

MoviesCardList.defaultProps = {
  typeOfList: 'default',
  onAddToFavourites: () => { },
};

export default MoviesCardList;
