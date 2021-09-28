import React from 'react';
import Header from '../Header/Header';
import NavTab from '../NavTab/NavTab';
import './Promo.css';

function Promo() {
  return (
    <div className="landing__promo">
      <Header />
      <p>Promo - компонент с вёрсткой баннера страницы «О проекте»</p>
      <NavTab />
    </div>
  );
}

export default Promo;
