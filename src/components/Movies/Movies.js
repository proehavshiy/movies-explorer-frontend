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
import { saveMovie } from '../../utils/MainApi';
import filterResults from '../../hooks/filterResults';

function Movies({ openInfoPopup, cardsData }) {
  const cards = JSON.parse(localStorage.getItem('movies'));
  const [waitingContent, setWaitingContent] = React.useState(null);

  function handleSearchFormSubmit(evt) {
    evt.preventDefault();
    const inputQuery = evt.target.search.value;

    // если в поле не введен запрос, показываем попап с валидацией
    if (!inputQuery) {
      openInfoPopup('searchMovies', 'error', 'searchValidationError');
    }

    if (inputQuery) {
      // отображается прелоадер во время ожидания ответа
      setWaitingContent(Preloader);
      moviesApi.getMovies()
        .then(({ data, result, statusCode }) => {
          // поиск фильмов по запросу из формы
          const filteredMovies = filterResults(data, inputQuery);
          console.log('filteredMovies:', filteredMovies);

          // если по поиску не найдено фильмов,
          // обнуляем предыдущее хранилище и выводим сообщение
          if (filteredMovies.length === 0) {
            localStorage.clear('movies');
            setWaitingContent(
              <div>
                Ничего не найдено
              </div>,
            );
          }
          // сохраняем полученные карточки в localstorage
          if (filteredMovies.length !== 0) {
            setWaitingContent(null);
            localStorage.setItem('movies', JSON.stringify(filteredMovies));
            openInfoPopup('getMovies', result, statusCode);
          }
        })
        .catch(({ result, statusCode }) => {
          setWaitingContent(
            <div>
              Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
            </div>,
          );
        });
    }
  }

  function addMovieToFavourites(nameOfFavourite) {
    // ищем нужную карточку в localstorage и получаем ее данные
    const favMovie = cards.find((movie) => movie.nameRU === nameOfFavourite);
    console.log('favCard:', favMovie);
    const {
      nameRU,
      nameEN,
      description,
      director,
      country,
      year,
      duration,
      image,
      trailerLink,
      id,
    } = favMovie;
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
      .then((res) => {
        console.log('res:', res);
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }
  return (
    <main className="movies page__main-content page__main-content-padding-top page__animation">
      <SearchForm
        onSubmit={handleSearchFormSubmit}
      />
      {cards ? (
        <MoviesCardList
          typeOfList="default"
          cardsData={cards}
          onDefaultCardClick={addMovieToFavourites}
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
