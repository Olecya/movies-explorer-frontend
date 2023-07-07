import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import './moviesCard.css';

export const MoviesCard = ({ movie, onMovieLike, myMovies = [], pathSavedMovies }) => {

    const [isHovering, setIsHovering] = useState(false);
    const { image, nameRU, duration, _id, trailerLink } = movie;

    const isLiked = () => myMovies.some(i => i.movieId === movie.id);

    useEffect(() => {
        isLiked()
    }, [myMovies])

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };
    const handleClickMovie = () => {
        window.open(movie.trailerLink, '_blank');
    }

    const likeButtonClassName = (
        `moviesCard__like ${isLiked() && 'moviesCard__like_aktiv'}`
    );

    const likeButton = (
        <>
            <button className={likeButtonClassName}
                type="button"
                aria-label="like"
                onClick={() => {
                    let mov = myMovies.find(i => i.movieId === movie.id)
                    console.log(mov);
                    isLiked() ? onMovieLike(mov, 'DELETE') : onMovieLike(movie, 'POST');
                }} />
        </>
    );

    const crestButton = (
        <>
            {isHovering && (
                <button className="moviesCard__crest"
                    type="button"
                    aria-label="cres"
                    onClick={() => {
                        onMovieLike(movie, 'DELETE');
                    }} />
            )}
        </>
    );

    return (
        <article className="moviesCard" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <img className="moviesCard__image"
                src={image.url ? `https://api.nomoreparties.co${image.url}` : image}
                alt={nameRU}
                onClick={handleClickMovie} />
            <div className="moviesCard__info">
                <h2 className="moviesCard__title">{nameRU}</h2>
                {!pathSavedMovies && likeButton}
                {pathSavedMovies && crestButton}
            </div>
            <p className="moviesCard__time">1ч42м</p>
        </article>
    )
}