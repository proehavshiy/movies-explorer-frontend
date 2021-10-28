/* eslint-disable max-len */
import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './Movies.css';

function Movies() {
  return (
    <main className="movies page__main-content page__main-content-padding-top">
      <SearchForm
        onSubmit={() => { }}
      />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
