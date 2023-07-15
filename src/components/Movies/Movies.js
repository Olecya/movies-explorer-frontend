import React, { useEffect, useState, useCallback } from "react";
import './Movies.css';
import { MovieButtonAdd } from "./MovieButtonAdd/MovieButtonAdd";
import { MoviesCard } from "./MoviesCard/MoviesCard";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import { SearchForm } from "./SearchForm/SearchForm";
import { countFilmList } from "../../utils/constants";

export const Movies = ({ loading, movies = [], myMovies = [], location, onSubmit, onMovieLike }) => {

    const [width, setWidth] = useState(window.innerWidth);
    const [filmList, setFilmList] = useState(5);
    const [isAddfilmList, setAddFilmList] = useState(2);
    const [filtering, setFiltering] = useState(false);
    const [moviesResylt, setMoviesResylt] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const [shortFilm, setShortFilm] = useState(false);

    useEffect(() => {
        const handleResize = (event) => {
            setTimeout(() => setWidth(event.target.innerWidth), 1000);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (width >= 890) {
            setFilmList(countFilmList.sizeXL);
            setAddFilmList(countFilmList.sizeS);
        } else if (width >= 480) {
            setFilmList(countFilmList.sizeL);
            setAddFilmList(countFilmList.sizeXS);
        } else {
            setFilmList(countFilmList.sizeM);
            setAddFilmList(countFilmList.sizeXS);
        };
    }, [width]);

    useEffect(() => {
        const saveShortFilm = (localStorage.getItem('saveShortFilm') === 'true');
        const word = localStorage.getItem('saveSearchWord');
        word && setSearchWord(word);
        saveShortFilm && setShortFilm(saveShortFilm);
    }, [])

    useEffect(() => {
        if (searchWord) {
            setFiltering(true);
            if (!movies?.length) onSubmit();
            if (movies?.length) filteringMovies(searchWord, movies);
        }
    }, [searchWord]);

    useEffect(() => {
        searchWord && !loading && filteringMovies(searchWord, movies);
    }, [loading, shortFilm]);

    function savedSearchWord(word) {
        setSearchWord(word);
        localStorage.setItem('saveSearchWord', word);
    }
    function savedShortFilm(stateShortFilm) {
        setShortFilm(stateShortFilm);
        localStorage.setItem('saveShortFilm', stateShortFilm);
    }

    const shortFilmFiltering = (movieCard) => {
        const shortMovie = movieCard.filter(function (m) {
            return m.duration < 41;
        })
        return (shortMovie);
    }

    const filteringMovies = useCallback((w, mov) => {
        async function filterItems(query, shortFilm) {
            if (mov?.length) {
                const m = mov.filter(function (m) {
                    return m.nameEN.toLowerCase().indexOf(query.toLowerCase()) > -1 | m.nameRU.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
                if (shortFilm) {
                    setMoviesResylt(shortFilmFiltering(m));
                    setFiltering(false);
                    return;
                }
                setMoviesResylt(m);
                setFiltering(false);
            }
        }
        filterItems(w, shortFilm);
    }, [searchWord, movies, shortFilm]);

    return (
        < >
            <SearchForm onSubmit={(w) => savedSearchWord(w)} value={searchWord} filterCheckbox={e => savedShortFilm(e)} />
            {filtering ?
                <Preloader /> :
                moviesResylt.length > 0 ?
                    <>
                        <MoviesCardList location={location} >
                            {
                                moviesResylt?.slice(0, filmList).map(m => (
                                    <MoviesCard key={m._id || m.id} movie={m} onMovieLike={onMovieLike} myMovies={myMovies} />
                                ))
                            }
                        </MoviesCardList>
                        {filmList < moviesResylt.length && <MovieButtonAdd hendleMovieButtonAdd={() => { setFilmList(filmList + isAddfilmList) }} />}
                    </> :
                    <div className="movie_not-found">Ничего не найденно</div>
            }
        </>
    )
}