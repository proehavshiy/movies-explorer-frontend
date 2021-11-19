/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './MoviesCardList.css';
import PropTypes from 'prop-types';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Ui/Button/Button';
import { BASE_URL } from '../../utils/MoviesApi';
import useWindowSize from '../../hooks/useWindowSize';

// настройки отображения карточек
function calculateCards(currentWidth) {
  if (currentWidth >= 1670) {
    return {
      initialCardsVisible: 24,
      visibleOnButtonClick: 4,
    };
  }
  if (currentWidth >= 1280) {
    return {
      initialCardsVisible: 12,
      visibleOnButtonClick: 3,
    };
  }
  if (currentWidth >= 630) {
    return {
      initialCardsVisible: 8,
      visibleOnButtonClick: 2,
    };
  }
  return {
    initialCardsVisible: 5,
    visibleOnButtonClick: 2,
  };
}

function MoviesCardList({ typeOfList, cardsData, onAddToFavourites, onRemoveFromFavourites }) {
  // актуальная ширина экрана
  const [windowWidth] = useWindowSize();
  // массив фильтрованных карточек для отображения
  const [cardsForRendering, setCardsForRendering] = React.useState([]);
  // кол-во карточек, которое нужно отрендерить еще по кнопке
  const [visible, setVisible] = React.useState(0);

  const defineCardsRendering = React.useCallback(() => {
    // исходя из ширины экрана, получаем настройки отображения
    const { initialCardsVisible, visibleOnButtonClick } = calculateCards(windowWidth);
    console.log('windowWidth:', windowWidth);
    console.log('initialCardsVisible:', initialCardsVisible);
    console.log('visibleOnButtonClick:', visibleOnButtonClick);
    console.log('cardsForRendering len:', cardsForRendering.length);
    setVisible(visibleOnButtonClick);

    // используем отображение по кнопке
    if (typeOfList === 'default') {
      // изначальное кол-во карточек пакуем в рендер-стейт
      if (!cardsForRendering.length) {
        return setCardsForRendering(cardsData.slice(0, initialCardsVisible));
      }
      // актуальзируем рендеринг-стейт, чтобы при поиске отображались актуальные результаты
      // return setCardsForRendering(cardsData.slice(0, cardsForRendering.length));
    }
    // не используем
    if (typeOfList === 'saved') {
      return setCardsForRendering(cardsData);
    }
  }, [cardsData, cardsForRendering.length, visible, windowWidth]);

  // вызываю функцию через таймаут в эффекте, чтобы зацикленность убрать
  // через реф карточки не бликуют при смене ресайза
  const limiter = React.useRef();
  React.useEffect(() => {
    clearTimeout(limiter.current);
    limiter.current = setTimeout(defineCardsRendering, 200);

    // также обновляю рендер-стейт на initial кол-во карточек, чтобы ряд был всегда заполненный
    const { initialCardsVisible } = calculateCards(windowWidth);
    setCardsForRendering(cardsData.slice(0, initialCardsVisible));
  }, [cardsData, windowWidth]);

  // колбэк отображения доп карточек
  const renderNewCards = () => {
    // уже отрисованные + новая порция по кнопке
    setCardsForRendering(cardsData.slice(0, cardsForRendering.length + visible));
  };

  // настройки параметров типа карточки
  const renderingCardInterface = (val, index, arr) => {
    const film = typeOfList === 'default' ? val : arr[arr.length - 1 - index];
    const key = typeOfList === 'default' ? film.id : film._id;
    const imageLink = typeOfList === 'default' ? `${BASE_URL}${film.image.url}` : film.image;
    const trailerLink = typeOfList === 'default' ? film.trailerLink : film.trailer;
    return { film, key, imageLink, trailerLink };
  };

  return (
    <section className="movies-card-list">
      <ul className="movies-card-list__cards-container">
        {
          cardsForRendering.map((v, index, arr) => {
            // если страница сохраненных, то итерация с конца массива
            const { film, key, imageLink, trailerLink } = renderingCardInterface(v, index, arr);
            return (
              <MoviesCard
                key={key}
                cardType={typeOfList}
                name={film.nameRU}
                duration={film.duration}
                image={imageLink}
                trailerLink={trailerLink}
                onAddToFavourites={onAddToFavourites}
                onRemoveFromFavourites={onRemoveFromFavourites}
                id={film._id}
              />
            );
          })
        }
      </ul>
      {typeOfList === 'default' && cardsForRendering.length < cardsData.length && (
        <div className="movies-card-list__button-container">
          <Button
            text="Ещё"
            label="кнопка Загрузить больше карточек"
            btnStyle="load-more-cards"
            disabled={false}
            onClick={renderNewCards}
          />
        </div>
      )}
    </section>
  );
}

MoviesCardList.propTypes = {
  typeOfList: PropTypes.oneOf(['default', 'saved']),
  cardsData: PropTypes.arrayOf(PropTypes.any).isRequired,
  onAddToFavourites: PropTypes.func,
  onRemoveFromFavourites: PropTypes.func.isRequired,
};

MoviesCardList.defaultProps = {
  typeOfList: 'default',
  onAddToFavourites: () => { },
};

export default MoviesCardList;
