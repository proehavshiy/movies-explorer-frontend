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

function Movies({ openInfoPopup, cardsData }) {
  // id пользователя для localstorage и определения владельца фильма
  const { _id } = React.useContext(CurrentUserContext);
  const [moviesForRendering, setmoviesForRendering] = React.useState([]);
  const cards = JSON.parse(localStorage.getItem(`${_id} movies`));
  const [waitingContent, setWaitingContent] = React.useState(null);

  React.useEffect(() => {
    setmoviesForRendering(cards);
  }, []);

  function handleSearchFormSubmit(evt) {
    evt.preventDefault();
    const inputQuery = evt.target.search.value;
    const isShortFilmsSelected = evt.target.isShortFilms.checked;

    // если в поле не введен запрос, показываем попап с ошибкой
    if (!inputQuery) {
      openInfoPopup('searchMovies', 'error', 'searchValidationError');
    }

    if (!cards) {
      // отображается прелоадер во время ожидания ответа
      setWaitingContent(Preloader);
      moviesApi.getMovies()
        .then(({ data, result, statusCode }) => {
          localStorage.setItem(`${_id} movies`, JSON.stringify(data));
          setmoviesForRendering(filterResults(data, inputQuery, isShortFilmsSelected));
          console.log('fffff:', moviesForRendering);
          setWaitingContent(null);
        })
        .catch(({ result, statusCode }) => {
          setWaitingContent(
            <div>
              Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
            </div>,
          );
        });
    }
    if (cards) {
      // поиск фильмов по запросу из формы
      const filteredMovies = filterResults(cards, inputQuery);
      console.log('filteredMovies:', filteredMovies);
      // если по поиску не найдено фильмов,
      // обнуляем предыдущее хранилище и выводим сообщение
      if (filteredMovies.length === 0) {
        setmoviesForRendering(null);
        localStorage.clear(`${_id} movies`);
        setWaitingContent(
          <div>
            Ничего не найдено
          </div>,
        );
      }
      // сохраняем полученные карточки в localstorage под _id пользователя,
      // чтобы у каждого пользователя был свой кэш поиска
      if (filteredMovies.length !== 0) {
        setWaitingContent(null);
        localStorage.setItem(`${_id} movies`, JSON.stringify(filteredMovies));
        setmoviesForRendering(filteredMovies);
        // openInfoPopup('getMovies', ressult, statusCode);
      }
    }
  }

  function addMovieToFavourites(nameOfFavourite) {
    // ищем нужную карточку в localstorage по названию и получаем ее данные
    const favMovie = cards.find((movie) => movie.nameRU === nameOfFavourite);
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
      `https://api.nomoreparties.co${image.url}`,
      trailerLink,
      `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
      id,
    )
      .then(({ data, result, statusCode }) => {
        // нужно пометить добавленную карточку _id, чтобы понимать, какую добавили
        // записать обратно в localstorage, чтобы потом по нему удалять карточку
        favMovie._id = data._id;
        // заменяем в localstorage карточку с _id (она теперь в избранном)
        const index = cards.indexOf(favMovie);
        cards.splice(index, 1, favMovie);
        // обновляем localstorage
        localStorage.setItem(`${_id} movies`, JSON.stringify(cards));
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }

  function deleteMovieFromFavourites(id) {
    console.log('id:', id);
    deleteMovie(id)
      .then(({ data, result, statusCode }) => {
        // нужно удалить из этой карточки в localstorage _id,
        // чтобы пометить ее как неизбранную теперь
        const cardForDeletion = cards.find((card) => card._id === data.deletedMovie._id);
        const index = cards.indexOf(cardForDeletion);
        delete cardForDeletion._id;
        // заменяем в localstorage карточку теперь без _id (она удалена из избранных)
        cards.splice(index, 1, cardForDeletion);
        // обновляем localstorage
        localStorage.setItem(`${_id} movies`, JSON.stringify(cards));
      })
      .catch((err) => {
        console.log('deleted movie error:', err);
      });
  }
  return (
    <main className="movies page__main-content page__main-content-padding-top page__animation">
      <SearchForm
        onSubmit={handleSearchFormSubmit}
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
  cardsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
Movies.defaultProps = {
  openInfoPopup: () => { },
};

export default Movies;
