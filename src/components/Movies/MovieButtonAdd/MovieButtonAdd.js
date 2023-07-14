import React from "react";
import './movieButtonAdd.css';

export const MovieButtonAdd = ({ hendleMovieButtonAdd }) => {

    return (
        <section className="movieButtonAdd">
            <button className="movieButtonAdd-still" onClick={hendleMovieButtonAdd}>Еще</button>
        </section>
    )
}