/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
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
import filterResults from '../../hooks/filterResults';

function SavedMovies({ onSearchFormSubmit, openInfoPopup, cardsData }) {
  const { _id } = React.useContext(CurrentUserContext);
  const [moviesForRendering, setmoviesForRendering] = React.useState(null);
  const cards = JSON.parse(localStorage.getItem(`${_id} movies`));
  const savedcards = JSON.parse(localStorage.getItem(`${_id} savedMovies`));
  const [waitingContent, setWaitingContent] = React.useState(null);

  React.useEffect(() => {
    getSavedMovies()
      .then(({ data, result, statusCode }) => {
        // отфильтровываем только сохраненные данным пользователем фильмы
        const mySavedMovies = data.filter((movie) => movie.owner === _id);
        // записываем сохраненные фильмы в localstorage для последующей фильтрации
        localStorage.setItem(`${_id} savedMovies`, JSON.stringify(mySavedMovies));
        // и записываем их в стейт для текущего отображения
        setmoviesForRendering(mySavedMovies);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }, []);

  function handleSearchFormSubmit(evt) {
    evt.preventDefault();
    const inputQuery = evt.target.search.value;
    const isShortFilmsSelected = evt.target.isShortFilms.checked;

    // если в поле не введен запрос, сбрасываем поиск, отображаем все карточки
    if (!inputQuery) {
      setmoviesForRendering(filterResults(savedcards, inputQuery, isShortFilmsSelected));
    }

    if (inputQuery) {
      // поиск фильмов по запросу из формы среди сохраненных в localstorage
      const filteredMovies = filterResults(savedcards, inputQuery, isShortFilmsSelected);
      console.log('f m :', filteredMovies);
      // обновляем стейт для отображения отфильтрованными фильмами
      setmoviesForRendering(filteredMovies);

      // если по поиску не найдено фильмов,
      // обнуляем предыдущее хранилище и выводим сообщение
      if (filteredMovies && filteredMovies.length === 0) {
        setmoviesForRendering(null);
        setWaitingContent(
          <div>
            Ничего не найдено
          </div>,
        );
      }
    }
  }

  function deleteMovieFromFavourites(id) {
    // ищем нужную карточку в localstorage и получаем ее данные

    deleteMovie(id)
      .then(({ data, result, statusCode }) => {
        // удалить из карточек localstorage _id,
        // чтобы убрать удаленным из избранного карточкам на странице фильмов лайк
        const cardForDeletion = cards.find((card) => card._id === id);
        // в if заворачиваем удаление _id из фильма в общем localstorage потому, что
        // если localstorage будет утерян или заменен, а код будет искать карточку по наличию в ней _id
        // и не найдет, то будет ошибка, карточка с сервера удалится, а со страницы нет
        if (cardForDeletion) {
          const index = cards.indexOf(cardForDeletion);
          delete cardForDeletion._id;
          cards.splice(index, 1, cardForDeletion);
        }
        localStorage.setItem(`${_id} movies`, JSON.stringify(cards));
        // удаляем из стейта удаленный фильм, чтобы он пропал со страницы
        setmoviesForRendering(moviesForRendering.filter((movie) => movie._id !== data.deletedMovie._id));
      })
      .catch((err) => {
        console.log('deleted movie error:', err);
      });
  }
  return (
    <main className="saved-movies page__main-content page__main-content-padding-top page__animation">
      <SearchForm
        onSubmit={handleSearchFormSubmit}
        isValidateForm={false}
      />
      {moviesForRendering ? (
        <MoviesCardList
          typeOfList="saved"
          cardsData={moviesForRendering}
          onRemoveFromFavourites={deleteMovieFromFavourites}
        />
      ) : waitingContent}
    </main>
  );
}

SavedMovies.propTypes = {
  onSearchFormSubmit: PropTypes.func.isRequired,
  cardsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  openInfoPopup: PropTypes.func,
};
SavedMovies.defaultProps = {
  openInfoPopup: () => { },
};
export default SavedMovies;
