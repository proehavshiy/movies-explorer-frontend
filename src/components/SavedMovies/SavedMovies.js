/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { getSavedMovies, deleteMovie } from '../../utils/MainApi';

function SavedMovies({ onSearchFormSubmit, cardsData }) {
  const [savedMovies, setSavedMovies] = React.useState([]);
  const cards = JSON.parse(localStorage.getItem('movies'));
  console.log('cards ls до удалени:', cards);

  React.useEffect(() => {
    getSavedMovies()
      .then(({ data, result, statusCode }) => {
        console.log('savedMovies:', data);
        setSavedMovies(data);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }, []);

  function deleteMovieFromFavourites(id) {
    // ищем нужную карточку в localstorage и получаем ее данные

    // const movieForDeletion = cards.find((movie) => movie.nameRU === nameOfRemovable);
    deleteMovie(id)
      .then((res) => {
        console.log('deleted movie seccess:', res);
        // удалить из карточек localstorage id,
        // чтобы убрать удаленным из избранного карточкам на странице фильмов лайк
        // те синхронизировать
        const cardForDeletion = cards.find((card) => card._id === id);
        console.log('card for delet:', cardForDeletion);
        const index = cards.indexOf(cardForDeletion);
        console.log('indexOf:', index);
        delete cardForDeletion._id;
        // favMovie._id = data._id;
        // favMovie.isFavourite = true;
        console.log('cardForDeletion после удаления айди', cardForDeletion);
        cards.splice(index, 1, cardForDeletion);
        // // console.log('updated cards:', newCards);
        localStorage.setItem('movies', JSON.stringify(cards));
        console.log('обновленный локалсторедж после удаления карточки:', JSON.parse(localStorage.getItem('movies')));
      })
      .catch((err) => {
        console.log('deleted movie error:', err);
      });
  }
  return (
    <main className="saved-movies page__main-content page__main-content-padding-top page__animation">
      <SearchForm
        onSubmit={onSearchFormSubmit}
      />
      <MoviesCardList
        typeOfList="saved"
        cardsData={savedMovies}
        onCardButtonClick={deleteMovieFromFavourites}
      // cardsData={cardsData.filter((movie) => movie.isFavourite === true)}
      />
    </main>
  );
}

SavedMovies.propTypes = {
  onSearchFormSubmit: PropTypes.func.isRequired,
  cardsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SavedMovies;
