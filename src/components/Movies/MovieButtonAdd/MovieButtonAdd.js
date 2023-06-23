import React from "react";
import './movieButtonAdd.css';

export const MovieButtonAdd = ({ hendleMovieButtonAdd }) => {

    // const hendleMovieButtonAdd = () => {
    //     console.log('hendleMovieButtonAdd')
    // }


    return (
        <section className="movieButtonAdd">
            <button className="movieButtonAdd-still" onClick={hendleMovieButtonAdd}>Еще</button>
        </section>
    )
}