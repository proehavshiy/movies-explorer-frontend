/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { getSavedMovies } from '../../utils/MainApi';

function SavedMovies({ onSearchFormSubmit, cardsData }) {
  const [savedMovies, setSavedMovies] = React.useState([]);
  // console.log('savedMovies:', savedMovies);
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
  return (
    <main className="saved-movies page__main-content page__main-content-padding-top page__animation">
      <SearchForm
        onSubmit={onSearchFormSubmit}
      />
      <MoviesCardList
        typeOfList="saved"
        cardsData={savedMovies}
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
