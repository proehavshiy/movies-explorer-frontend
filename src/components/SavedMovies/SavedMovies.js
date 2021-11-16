/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { getSavedMovies } from '../../utils/MainApi';
import filterResults from '../../hooks/filterResults';
import SearchResultsBar from '../SearchResultsBar/SearchResultsBar';

function SavedMovies({ openInfoPopup, onDeleteCard }) {
  // id пользователя для localstorage и определения владельца фильма
  const { _id } = React.useContext(CurrentUserContext);
  const [moviesForRendering, setmoviesForRendering] = React.useState(null);
  const savedCards = JSON.parse(localStorage.getItem(`${_id} savedMovies`));
  const [waitingContent, setWaitingContent] = React.useState(null);

  // получение сохраненных фильмов пользоваетля при загрузке страницы
  React.useEffect(() => {
    getSavedMovies()
      .then(({ data }) => {
        // отфильтровываем только сохраненные данным пользователем фильмы
        const mySavedMovies = data.filter((movie) => movie.owner === _id);
        // записываем сохраненные фильмы в localstorage для последующей фильтрации и в стейт рендеринга
        localStorage.setItem(`${_id} savedMovies`, JSON.stringify(mySavedMovies));
        setmoviesForRendering(mySavedMovies);
      })
      .catch(() => {
        openInfoPopup('default', 'error', 'message');
      });
  }, [_id, openInfoPopup]);

  // в случае отсутствия фильмов, рендерит статус
  React.useEffect(() => {
    if (moviesForRendering && moviesForRendering.length === 0) {
      setmoviesForRendering(null);
      setWaitingContent(
        <SearchResultsBar
          phrase="Сохраненных фильмов пока нет"
        />,
      );
    }
  }, [moviesForRendering]);

  const handleSearchFormSubmit = (evt) => {
    evt.preventDefault();
    const inputQuery = evt.target.search.value;
    const isShortFilmsSelected = evt.target.isShortFilms.checked;
    const filteredMovies = filterResults(savedCards, inputQuery, isShortFilmsSelected);

    // если в поле не введен запрос, сбрасываем поиск, отображаем все карточки
    // если при этом карточек нет, выводим статус, что карточек нет
    if (!inputQuery) {
      if (filteredMovies.length !== 0) {
        setmoviesForRendering(filteredMovies);
      }
    }
    // поиск фильмов по запросу из формы среди сохраненных в localstorage
    // обновляем стейт для отображения отфильтрованными фильмами
    // если по поиску не найдено фильмов,
    // обнуляем предыдущее хранилище и выводим сообщение
    if (inputQuery) {
      if (filteredMovies && filteredMovies.length !== 0) {
        setmoviesForRendering(filteredMovies);
      } else {
        setmoviesForRendering(null);
        setWaitingContent(
          <SearchResultsBar
            phrase="Ничего не найдено"
          />,
        );
      }
    }
  };

  const deleteMovieFromFavourites = (id) => {
    // вторым параметром обновляем стейт для рендеринга карточек
    onDeleteCard(id, () => setmoviesForRendering((prevState) => prevState.filter((movie) => movie._id !== id)));
  };

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
  openInfoPopup: PropTypes.func,
  onDeleteCard: PropTypes.func.isRequired,
};
SavedMovies.defaultProps = {
  openInfoPopup: () => { },
};
export default SavedMovies;
