import React, { useEffect, useState, useCallback } from "react";
import { MovieButtonAdd } from "./MovieButtonAdd/MovieButtonAdd";
import { MoviesCard } from "./MoviesCard/MoviesCard";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import { SearchForm } from "./SearchForm/SearchForm";
import { countFilmList } from "../../utils/constants";

export const Movies = ({ loading, movies = [], location, onSubmit = { onSubmit } }) => {

    const [filmList, setFilmList] = useState(countFilmList);
    const [filtering, setFiltering] = useState(false);
    const [moviesResylt, setMoviesResylt] = useState([]);
    const [searchWord, setSearchWord] = useState('');

    useEffect(() => {
        console.log(searchWord);
        if (searchWord) {
            setFiltering(true);
            if (!movies?.length) onSubmit();
            if (movies?.length) filteringMovies(searchWord, movies);
        }
    }, [searchWord]);

    useEffect(() => {
        console.log(loading, searchWord, movies);
        searchWord && !loading && filteringMovies(searchWord, movies);
    }, [loading]);

    const filteringMovies = useCallback((w, mov) => {
        console.log(w, mov[1]);

        async function filterItems(query) {
            if (mov?.length) {
                const m = mov.filter(function (m) {
                    return m.nameEN.toLowerCase().indexOf(query.toLowerCase()) > -1 | m.nameRU.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
                console.log(m);
                setMoviesResylt(m);
                setFiltering(false);
            }
        }
        filterItems(w);
        console.log(w, '   ', moviesResylt);

    }, [searchWord, movies]);

    return (
        < >
            <SearchForm onSubmit={(w) => setSearchWord(w)} value={searchWord}
            // handleSearch={(e) => handleSearch(e)} 
            />
            {filtering ?
                <Preloader /> :
                moviesResylt.length>-1 ?
                <>
                    <MoviesCardList location={location} >
                        {
                            moviesResylt?.slice(0, filmList).map(m => (
                                <MoviesCard key={m._id || m.id} movie={m} />
                            ))
                        }
                    </MoviesCardList>
                    {filmList <= moviesResylt.length && <MovieButtonAdd hendleMovieButtonAdd={() => { setFilmList(filmList + countFilmList) }} />}
                </> :
                <div>Ничего не найденно</div>
            }
        </>
    )
}