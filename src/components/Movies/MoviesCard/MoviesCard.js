import React, { useState } from "react";
import './moviesCard.css';

export const MoviesCard = ({ movie, onMovieLike, myMovie, savedMovies }) => {

    const [liked, setLiked] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const { image, nameRU, duration, _id, trailerLink } = movie;
    // const isLiked = () => { // сравнивать по айди?
    //     // const isLiked = myMovie.some(i => i._id === movie._id);    
    //     return liked;
    // };

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const likeButtonClassName = (
        `moviesCard__like ${liked && 'moviesCard__like_aktiv'}`
    );

    const likeButton = (
        <button className={likeButtonClassName}
            type="button"
            aria-label="like"
            onClick={() => {
                // onMovieLike(movie, isLiked ? 'DELETE' : 'PUT');
                setLiked(!liked);
            }} />
    );

    const crestButton = (
        <>
            {isHovering && (
                <button className="moviesCard__crest"
                    type="button"
                    aria-label="cres"
                    onClick={() => {
                        // onMovieLike(movie, isLiked ? 'DELETE' : 'PUT');
                        setLiked(!liked);
                    }} />
            )}
        </>
    );

    return (
        <article className="moviesCard" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <img className="moviesCard__image"
                // src={'https://avatars.mds.yandex.net/i?id=7729b3b91c0efaadb47d6914f0641433-5663462-images-thumbs&n=13'}
                src={`https://api.nomoreparties.co${image.url}`}
                alt={nameRU} />
            <div className="moviesCard__info">
                <h2 className="moviesCard__title">{nameRU}</h2>
                {!savedMovies && likeButton}
                {savedMovies && crestButton}
            </div>
            <p className="moviesCard__time">1ч42м</p>
        </article>
    )
}