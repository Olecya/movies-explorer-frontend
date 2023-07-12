
import React, { useCallback, useEffect, useState } from "react";
import { MoviesCard } from "./MoviesCard/MoviesCard";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import { SearchForm } from "./SearchForm/SearchForm";
export const SavedMovies = ({ loading, location, onSubmit, myMovies = [], onMovieLike }) => {

    const [searchWord, setSearchWord] = useState('');
    const [shortFilm, setShortFilm] = useState(false);
    const [moviesResylt, setMoviesResylt] = useState(myMovies);

    useEffect(() => {
        setMoviesResylt(myMovies);
    }, [myMovies])

    useEffect(() => {
        filteringMovies(searchWord, myMovies);
    }, [shortFilm, searchWord]);

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
                    return;
                }
                setMoviesResylt(m);
            }
        }
        filterItems(w, shortFilm);
    }, [searchWord, myMovies, shortFilm]);

    function savedSearchWord(w) {
        setSearchWord(w);
    }
    function savedShortFilm(a) {
        setShortFilm(a);
    }

    return (
        < >
            <SearchForm onSubmit={(w) => savedSearchWord(w)} value={searchWord} filterCheckbox={e => savedShortFilm(e)} savedMovies={true} />
            {loading ? <Preloader /> :
                <>
                    <MoviesCardList location={location}>
                        {
                            moviesResylt.map(m => (
                                <MoviesCard key={m._id || m.id} movie={m} onMovieLike={onMovieLike} pathSavedMovies={true} myMovies={myMovies} />
                            ))
                        }
                    </MoviesCardList>
                </>
            }
        </>
    )
}