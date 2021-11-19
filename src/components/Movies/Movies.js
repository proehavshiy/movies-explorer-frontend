/* eslint-disable no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-expressions */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';
import Preloader from '../Preloader/Preloader';
import * as moviesApi from '../../utils/MoviesApi';
import filterResults from '../../hooks/filterResults';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SearchResultsBar from '../SearchResultsBar/SearchResultsBar';

function Movies({ openInfoPopup, onAddCard, onDeleteCard }) {
  // id пользователя для localstorage и определения владельца фильма
  const { _id } = React.useContext(CurrentUserContext);
  const [moviesForRendering, setmoviesForRendering] = React.useState(null);
  const movies = JSON.parse(localStorage.getItem(`${_id} movies`));
  const searchParameters = JSON.parse(localStorage.getItem(`${_id} search params`));
  const [waitingContent, setWaitingContent] = React.useState(null);

  // при заходе на страницу - отображение результатов поиска по предыдущему запросу
  React.useEffect(() => {
    // если результаты не найдены, выводится "Ничего не найдено"
    if (searchParameters) {
      const filteredMovies = filterResults(movies, searchParameters.inputQuery, searchParameters.isShortFilmsSelected);
      filteredMovies && filteredMovies.length === 0
        ? setWaitingContent(<SearchResultsBar phrase="Ничего не найдено" />)
        : setmoviesForRendering(filteredMovies);
    }
  }, []);

  const handleSearchFormSubmit = (evt) => {
    evt.preventDefault();
    const inputQuery = evt.target.search.value;
    const isShortFilmsSelected = evt.target.isShortFilms.checked;
    localStorage.setItem(`${_id} search params`, JSON.stringify({ inputQuery, isShortFilmsSelected }));

    // если в поле не введен запрос, показываем попап с ошибкой
    if (!inputQuery) {
      openInfoPopup('searchMovies', 'error', 'searchValidationError');
    }

    // если запрос введен, но нет массива фильмов в localstorage
    if (inputQuery && !movies) {
      // отображается прелоадер во время ожидания ответа
      setWaitingContent(Preloader);
      moviesApi.getMovies()
        .then(({ data }) => {
          // сохраняем в localstorage исходный массив карточек.
          // Он нужен для поиска по нему фильмов и для запоминания, какие карточки в избранном
          localStorage.setItem(`${_id} movies`, JSON.stringify(data));
          // сохраняем в рендеринг-стейт отфильтрованный массив фильмов.
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
    // если запрос введен и массив всех фильмов уже получен, то только фильтруем его
    if (inputQuery && movies) {
      // поиск фильмов по запросу из формы
      const filteredMovies = filterResults(movies, inputQuery, isShortFilmsSelected);
      // если по поиску не найдено фильмов,
      // обнуляем рендеринг-стейт и выводим сообщение
      if (filteredMovies && filteredMovies.length === 0) {
        setmoviesForRendering(null);
        setWaitingContent(
          <SearchResultsBar
            phrase="Ничего не найдено"
          />,
        );
      }
      // если по поиску что-то нашлось, обновляем рендеринг-стейт карточками
      if (filteredMovies && filteredMovies.length !== 0) {
        setWaitingContent(null);
        setmoviesForRendering(filteredMovies);
      }
    }
  };

  // функция обновления стейта для рендеринга карточек
  const updateRenderingState = (setState) => {
    const movies = JSON.parse(localStorage.getItem(`${_id} movies`));
    const searchParameters = JSON.parse(localStorage.getItem(`${_id} search params`));
    if (!movies || !searchParameters) return;
    setState(filterResults(movies, searchParameters.inputQuery, searchParameters.isShortFilmsSelected));
  };

  const addMovieToFavourites = (movieName) => {
    // вторым параметром обновляем стейт для рендеринга карточек
    onAddCard(movieName, () => updateRenderingState(setmoviesForRendering));
  };

  const deleteMovieFromFavourites = (id) => {
    // вторым параметром обновляем стейт для рендеринга карточек
    onDeleteCard(id, () => updateRenderingState(setmoviesForRendering));
  };

  return (
    <main className="movies page__main-content page__main-content-padding-top page__animation">
      <SearchForm
        onSubmit={handleSearchFormSubmit}
        initialInputValue={searchParameters && searchParameters.inputQuery}
        isChecked={searchParameters && searchParameters.isShortFilmsSelected}
        isValidateForm
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
  onAddCard: PropTypes.func.isRequired,
  onDeleteCard: PropTypes.func.isRequired,
};
Movies.defaultProps = {
  openInfoPopup: () => { },
};

export default Movies;
