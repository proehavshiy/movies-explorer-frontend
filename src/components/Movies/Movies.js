/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable object-curly-newline */
/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import * as moviesApi from '../../utils/MoviesApi';
import { saveMovie, deleteMovie } from '../../utils/MainApi';
import filterResults from '../../hooks/filterResults';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SearchResultsBar from '../SearchResultsBar/SearchResultsBar';

function Movies({ openInfoPopup }) {
  // id пользователя для localstorage и определения владельца фильма
  const { _id } = React.useContext(CurrentUserContext);
  const [moviesForRendering, setmoviesForRendering] = React.useState(null);
  const movies = JSON.parse(localStorage.getItem(`${_id} movies`));
  const searchParameters = JSON.parse(localStorage.getItem(`${_id} search params`));
  const [waitingContent, setWaitingContent] = React.useState(null);

  React.useEffect(() => {
    if (searchParameters) {
      setmoviesForRendering(filterResults(movies, searchParameters.inputQuery, searchParameters.isShortFilmsSelected));
    }
  }, []);

  function handleSearchFormSubmit(evt) {
    evt.preventDefault();
    const inputQuery = evt.target.search.value;
    const isShortFilmsSelected = evt.target.isShortFilms.checked;
    localStorage.setItem(`${_id} search params`, JSON.stringify({ inputQuery, isShortFilmsSelected }));

    // если в поле не введен запрос, показываем попап с ошибкой
    if (!inputQuery) {
      openInfoPopup('searchMovies', 'error', 'searchValidationError');
    }

    if (inputQuery && !movies) {
      // отображается прелоадер во время ожидания ответа
      setWaitingContent(Preloader);
      moviesApi.getMovies()
        .then(({ data }) => {
          // сохраняем в localstorage исходный массив карточек.
          // Он нужен для поиска по нему фильмов и для запоминания, какие карточки в избранном
          localStorage.setItem(`${_id} movies`, JSON.stringify(data));
          // сохраняем в другой localstorage отфильтрованный массив.
          // Он нужен только для отображения результатов поиска
          const filteredMovies = filterResults(data, inputQuery, isShortFilmsSelected);
          setmoviesForRendering(filteredMovies);
          setWaitingContent(null);
        })
        .catch(() => {
          setWaitingContent(
            <SearchResultsBar
              phrase="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            />,
          );
        });
    }
    if (inputQuery && movies) {
      // поиск фильмов по запросу из формы
      const filteredMovies = filterResults(movies, inputQuery, isShortFilmsSelected);
      // если по поиску не найдено фильмов,
      // обнуляем предыдущее хранилище и выводим сообщение
      if (filteredMovies.length === 0) {
        setmoviesForRendering(null);
        setWaitingContent(
          <SearchResultsBar
            phrase="Ничего не найдено"
          />,
        );
      }
      // сохраняем полученные карточки в localstorage под _id пользователя,
      // чтобы у каждого пользователя был свой кэш поиска
      if (filteredMovies.length !== 0) {
        setWaitingContent(null);
        setmoviesForRendering(filteredMovies);
      }
    }
  }

  function addMovieToFavourites(nameOfFavourite) {
    // ищем нужную карточку в localstorage по названию и получаем ее данные
    const favMovie = movies.find((movie) => movie.nameRU === nameOfFavourite);
    // нужно проверить по наличию _id, добавлена ли уже эта карточка в избранные,
    // чтобы нельзя было добавить тот же фильм второй раз
    const { nameRU, nameEN, description, director, country, year, duration, image, trailerLink, id } = favMovie;
    saveMovie(
      nameRU,
      nameEN,
      description,
      director,
      country ?? 'Без страны',
      year,
      duration,
      `${moviesApi.BASE_URL}${image.url}`,
      trailerLink,
      `${moviesApi.BASE_URL}${image.formats.thumbnail.url}`,
      id,
    )
      .then(({ data }) => {
        // нужно пометить добавленную карточку _id, чтобы понимать, какую добавили
        // записать обратно в localstorage, чтобы потом по нему удалять карточку
        favMovie._id = data._id;
        // заменяем в localstorage карточку с _id (она теперь в избранном)
        const index = movies.indexOf(favMovie);
        movies.splice(index, 1, favMovie);
        // обновляем localstorage
        localStorage.setItem(`${_id} movies`, JSON.stringify(movies));
        setmoviesForRendering(filterResults(movies, searchParameters.inputQuery, searchParameters.isShortFilmsSelected));
      })
      .catch(() => {
        openInfoPopup('addToFavourites', 'error', 'addToFavouritesError');
      });
  }

  function deleteMovieFromFavourites(id) {
    deleteMovie(id)
      .then(({ data }) => {
        // удалить из карточек localstorage _id,
        // чтобы убрать удаленным из избранного карточкам на странице фильмов лайк
        const cardForDeletion = movies.find((card) => card._id === data.deletedMovie._id);
        // в if заворачиваем удаление _id из фильма в общем localstorage потому, что
        // если localstorage будет утерян или заменен, а код будет искать карточку по наличию в ней _id
        // и не найдет, то будет ошибка, карточка с сервера удалится, а со страницы нет
        if (cardForDeletion) {
          const index = movies.indexOf(cardForDeletion);
          delete cardForDeletion._id;
          movies.splice(index, 1, cardForDeletion);
        }
        // обновляем localstorage
        localStorage.setItem(`${_id} movies`, JSON.stringify(movies));
        // обновляем стейт для рендеринга карточек
        setmoviesForRendering(filterResults(movies, searchParameters.inputQuery, searchParameters.isShortFilmsSelected));
      })
      .catch(({ result, statusCode }) => {
        openInfoPopup('deleteMovie', result, statusCode);
      });
  }
  return (
    <main className="movies page__main-content page__main-content-padding-top page__animation">
      <SearchForm
        onSubmit={handleSearchFormSubmit}
        initialInputValue={searchParameters && searchParameters.inputQuery}
        isChecked={searchParameters && searchParameters.isShortFilmsSelected}
      />
      {moviesForRendering ? (
        <MoviesCardList
          typeOfList="default"
          cardsData={moviesForRendering}
          onAddToFavourites={addMovieToFavourites}
          onRemoveFromFavourites={deleteMovieFromFavourites}
        />
      ) : waitingContent}
    </main>
  );
}

Movies.propTypes = {
  openInfoPopup: PropTypes.func,
};
Movies.defaultProps = {
  openInfoPopup: () => { },
};

export default Movies;
