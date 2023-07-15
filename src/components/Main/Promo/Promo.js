import React from 'react';
import './promo.css';

export const Promo = ({ aboutProjectScroll, ref }) => {

    return (
        <div className="promo promo_header" ref={ref}>
            <div className="promo__text">
                <h1 className="promo__title"> Учебный проект студента факультета<br />Веб-разработки. </h1>
                <p className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <button className="promo__but" onClick={aboutProjectScroll} >Узнать больше</button>
            </div>
            <div className="promo__main-illustration" />
        </div>
    )
}