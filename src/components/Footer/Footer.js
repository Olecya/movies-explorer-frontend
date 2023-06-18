import React from 'react';
import { useLocation } from 'react-router';
import './footer.css';

export default function Footer() {
  let location = useLocation();

  const showFooter = () => {
    switch (location.pathname) {
      case `/profile`:
      case `/sign-in`:
      case `/sign-up`:
      case `/not-found-page`:
        return false;

      default:
        return true;
    }
  }

  return (
    <>
      {showFooter() &&
        < footer className="footer" >
          <h3 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
          <div className="footer__container">
            <h3 className="footer__date">&copy;2023</h3>
            <div className="footer__link">
              <a className="footer__links" href="https://practicum.yandex.ru/">Яндекс.Практикум</a>
              <a className="footer__links" href="https://github.com/Olecya">Github</a>
            </div>
          </div>
        </footer >}
    </>
  );
}