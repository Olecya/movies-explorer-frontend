import React, { useEffect, useState, useCallback, useContext } from "react";
import './Movies.css';
import { MovieButtonAdd } from "./MovieButtonAdd/MovieButtonAdd";
import { MoviesCard } from "./MoviesCard/MoviesCard";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import { SearchForm } from "./SearchForm/SearchForm";
import { countFilmList } from "../../utils/constants";

export const Movies = ({ loading, movies = [], myMovies = [], location, onSubmit = { onSubmit }, onMovieLike }) => {

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
        const w = localStorage.getItem('saveSearchWord');
        const a = localStorage.getItem('saveShortFilm')
        w && setSearchWord(w);
        a && setShortFilm(a);
    }, [])

    useEffect(() => {
        // console.log(searchWord);
        if (searchWord) {
            setFiltering(true);
            if (!movies?.length) onSubmit();
            if (movies?.length) filteringMovies(searchWord, movies);
        }
    }, [searchWord]);

    useEffect(() => {
        // console.log(loading, searchWord, movies);
        searchWord && !loading && filteringMovies(searchWord, movies);
    }, [loading, shortFilm]);

    function savedSearchWord(w) {
        setSearchWord(w);
        localStorage.setItem('saveSearchWord', w);
    }
    function savedShortFilm(a) {
        setShortFilm(a);
        localStorage.setItem('saveShortFilm', a);
    }

    const shortFilmFiltering = (mov) => {
        const shortMovie = mov.filter(function (m) {
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