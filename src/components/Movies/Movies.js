import React from 'react';
import PropTypes from 'prop-types';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies({ onSearchFormSubmit, cardsData }) {
  return (
    <main className="movies page__main-content page__main-content-padding-top page__animation">
      <SearchForm
        onSubmit={onSearchFormSubmit}
      />
      <MoviesCardList
        typeOfList="default"
        cardsData={cardsData}
      />
    </main>
  );
}

Movies.propTypes = {
  onSearchFormSubmit: PropTypes.func.isRequired,
  cardsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Movies;
