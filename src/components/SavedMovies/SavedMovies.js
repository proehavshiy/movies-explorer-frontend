import React from 'react';
import PropTypes from 'prop-types';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies({ onSearchFormSubmit, cardsData }) {
  return (
    <main className="saved-movies page__main-content page__main-content-padding-top">
      <SearchForm
        onSubmit={onSearchFormSubmit}
      />
      <MoviesCardList
        typeOfList="saved"
        cardsData={cardsData.filter((movie) => movie.isFavourite === true)}
      />
    </main>
  );
}

SavedMovies.propTypes = {
  onSearchFormSubmit: PropTypes.func.isRequired,
  cardsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SavedMovies;
