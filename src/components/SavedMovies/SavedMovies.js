/* eslint-disable max-len */
import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';

function SavedMovies() {
  return (
    <main className="saved-movies page__main-content page__main-content-padding-top">
      <SearchForm
        onSubmit={() => { }}
      />
      <MoviesCardList
        typeOfList="saved"
        cardsData={[
          {
            id: 1,
            name: 'Статский советник',
            duration: 350,
            image: 'https://www.film.ru/sites/default/files/styles/thumb_1024x450/public/trailers_frame/_normal.jpeg',
            status: 'saved',
          },
          {
            id: 2,
            name: 'Ширли-мырли',
            duration: 121,
            image: 'https://img51994.domkino.tv/img/2017-08-14/fmt_114_24_eaf857a9d5664323be69f5fd45b6e03c024_shirli2.png',
            status: 'saved',
          },
          {
            id: 4,
            name: 'Хрусталёв, машину!',
            duration: 153,
            image: 'https://4.bp.blogspot.com/-R3-SfbDpc8c/WlUhx7cbAMI/AAAAAAAASDg/eBrQ_0zXOaYIV2ep9RXE8xpLuYREJk73ACLcBGAs/s1600/7.jpg',
            status: 'saved',
          },
          {
            id: 5,
            name: 'Подранки',
            duration: 137,
            image: 'https://thumbs.dfs.ivi.ru/storage9/contents/6/1/0e767c42b18a502b59bed63b495b75.jpg',
            status: 'saved',
          },
          {
            id: 6,
            name: 'Подранки',
            duration: 138,
            image: 'https://thumbs.dfs.ivi.ru/storage9/contents/6/1/0e767c42b18a502b59bed63b495b75.jpg',
            status: 'saved',
          },
          {
            id: 7,
            name: 'Подранки',
            duration: 29,
            image: 'https://thumbs.dfs.ivi.ru/storage9/contents/6/1/0e767c42b18a502b59bed63b495b75.jpg',
            status: 'saved',
          },
          {
            id: 8,
            name: 'Подранки',
            duration: 140,
            image: 'https://thumbs.dfs.ivi.ru/storage9/contents/6/1/0e767c42b18a502b59bed63b495b75.jpg',
            status: 'saved',
          },
        ]}
      />
    </main>
  );
}

export default SavedMovies;
