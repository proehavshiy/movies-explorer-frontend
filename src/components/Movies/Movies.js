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

function Movies({ onSearchFormSubmit, openInfoPopup, cardsData }) {
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
          // сохраняем полученные карточки в localstorage
          localStorage.setItem('movies', JSON.stringify(data));
          openInfoPopup('getMovies', result, statusCode);
        })
        .catch(({ result, statusCode }) => {
          setWaitingContent(
            <div>
              Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз
            </div>,
          );
        })
        .finally(() => {
          setWaitingContent(null);
        });
    }
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
        />
      ) : waitingContent}
    </main>
  );
}

Movies.propTypes = {
  onSearchFormSubmit: PropTypes.func.isRequired,
  openInfoPopup: PropTypes.func,
  cardsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};
Movies.defaultProps = {
  openInfoPopup: () => { },
};

export default Movies;
