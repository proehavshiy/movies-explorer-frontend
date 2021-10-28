/* eslint-disable no-unused-vars */
import React from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';

function MoviesCardList({ saveMovieSubmitStatus }) {
  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards-container">
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">В погоне за Бенкси</h2>
              <p className="movies-card__duration" title="144 минуты">27 минут</p>
            </figcaption>
            <img className="movies-card__image" src="https://mnogo-smysla.ru/wp-content/uploads/2017/12/2017-12-28-17-00-18.jpg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-saved page__button" type="button" aria-label="кнопка Сохранить" />
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">Статский советник</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.film.ru/sites/default/files/styles/thumb_1024x450/public/trailers_frame/_normal.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-delete page__button" type="button" aria-label="кнопка Сохранить" />
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
        <li className="movies-card">
          <figure className="movies-card__content">
            <figcaption className="movies-card__figcaption">
              <h2 className="movies-card__title" title="На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́">На Дериба́совской хоро́шая пого́да, или На Бра́йтон-Бич опя́ть иду́т дожди́</h2>
              <p className="movies-card__duration" title="144 минуты">144 минуты</p>
            </figcaption>
            <img className="movies-card__image" src="https://www.vokrug.tv/pic/product/e/7/6/a/e76a0100ea69a93f8e1439d7cfb62483.jpeg" alt="картинка карточки" />
          </figure>
          <div className="movies-card__button-wrapper">
            <button className="movies-card__button movies-card__button_movie-save page__button" type="button" aria-label="кнопка Сохранить">Сохранить</button>
          </div>
        </li>
      </ul>
      <div className="movies-card-list__button-container">
        <button className="movies-card__button movies-card__button_load-more-cards page__button" type="button" aria-label="кнопка Загрузить больше карточек">Ещё</button>
      </div>
    </section>
  );
}

MoviesCardList.propTypes = {
  saveMovieSubmitStatus: PropTypes.bool,
};

MoviesCardList.defaultProps = {
  saveMovieSubmitStatus: true,
};

export default MoviesCardList;
