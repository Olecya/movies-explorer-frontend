import React, { useEffect } from "react";
// import { useLocation } from 'react-router';
import './moviesCardList.css';

export const MoviesCardList = ({ children, location }) => {
    
    return (
        <section className={`moviesCardList ${location.pathname === '/saved-movies' && "moviesCardSavedList"}`} >
            {children}
        </section>
    )
}