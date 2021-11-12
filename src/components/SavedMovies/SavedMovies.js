/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { getSavedMovies, deleteMovie } from '../../utils/MainApi';

function SavedMovies({ onSearchFormSubmit, cardsData }) {
  const [savedMovies, setSavedMovies] = React.useState([]);
  const { _id } = React.useContext(CurrentUserContext);
  console.log('currentUser!!:', _id);
  const cards = JSON.parse(localStorage.getItem(_id));
  console.log('cards ls до удалени:', cards);

  React.useEffect(() => {
    getSavedMovies()
      .then(({ data, result, statusCode }) => {
        console.log('savedMovies:', data);
        // отфильтровываем только сохраненные данным пользователем фильмы
        const mySavedMovies = data.filter((movie) => movie.owner === _id);
        console.log('mySavedMovies:', mySavedMovies);
        setSavedMovies(mySavedMovies);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }, [_id]);

  function deleteMovieFromFavourites(id) {
    // ищем нужную карточку в localstorage и получаем ее данные

    // const movieForDeletion = cards.find((movie) => movie.nameRU === nameOfRemovable);
    deleteMovie(id)
      .then(({ data, result, statusCode }) => {
        console.log('deleted movie seccess:', data);
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
        localStorage.setItem(_id, JSON.stringify(cards));
        // удаляем из стейта удаленный фильм, чтобы он пропал со страницы
        setSavedMovies(savedMovies.filter((movie) => movie._id !== data.deletedMovie._id));
        console.log('savedMovies после удаления:', savedMovies);
        console.log('обновленный локалсторедж после удаления карточки:', JSON.parse(localStorage.getItem(_id)));
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
        // onCardButtonClick={deleteMovieFromFavourites}
        // cardsData={cardsData.filter((movie) => movie.isFavourite === true)}
        onRemoveFromFavourites={deleteMovieFromFavourites}
      />
    </main>
  );
}

SavedMovies.propTypes = {
  onSearchFormSubmit: PropTypes.func.isRequired,
  cardsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SavedMovies;
