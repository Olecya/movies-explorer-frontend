import React from "react";
// import { useLocation } from 'react-router';
import './moviesCardList.css';

export const MoviesCardList = ({ children, location }) => {
    // let location = useLocation();

    return (
        <section className={`moviesCardList ${location.pathname === '/saved-movies' ? "moviesCardSavedList": ""}`} >{children}</section>
    )
}