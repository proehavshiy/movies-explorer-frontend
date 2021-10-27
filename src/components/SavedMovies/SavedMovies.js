/* eslint-disable max-len */
import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <main className="saved-movies page__main-content page__main-content-padding-top">
      <SearchForm
        onSubmit={() => { }}
      />
    </main>
  );
}

export default SavedMovies;
