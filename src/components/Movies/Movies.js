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

    let loadMoviesArr;

    // const handleSubmit = useCallback((w) => {

    // }, []);

    useEffect((w) => {
        onSubmit();
        !loading && filteringMovies(loadMoviesArr);
        loading && setFiltering(true);
        console.log(movies)
    }, [loadMoviesArr]);

    async function handleSubmit(w) {
        setSearchWord(w);
        console.log(searchWord);
        if (!movies?.length) {
            console.log('23');
            loadMoviesArr = w;
            loading && setFiltering(true);
        } else {
            console.log('Мы тут   ', !movies?.length);
            console.log(w)

            // handleSearch(w);
            filteringMovies(w);
        }

    }


    // function handleSearch(w) {
    //     setSearchWord(w);
    //     // filteringMovies();
    // }

    function filteringMovies(w) {
        // console.log(searchWord);
        // console.log(movies);

        async function filterItems(query) {

            let m;
            if (movies?.length) {
                m = movies.filter(function (m) {
                    return m.nameEN.toLowerCase().indexOf(query.toLowerCase()) > -1 | m.nameRU.toLowerCase().indexOf(query.toLowerCase()) > -1;
                });
                // console.log(m);
                setMoviesResylt(m);
                setFiltering(false);
            }
        }
        filterItems(w);
        console.log(searchWord, '   ', moviesResylt);
    }

    // useEffect(() => {
    //     loading && setFiltering(true);
    // }, [loading]);

    return (
        < >
            <SearchForm onSubmit={handleSubmit}
            // handleSearch={(e) => handleSearch(e)} 
            />
            {filtering ? <Preloader /> :
                <>
                    <MoviesCardList location={location} >
                        {
                            moviesResylt?.slice(0, filmList).map(m => (
                                <MoviesCard key={m._id || m.id} movie={m} />
                            ))
                        }
                    </MoviesCardList>
                    {filmList <= moviesResylt.length && <MovieButtonAdd hendleMovieButtonAdd={() => { setFilmList(filmList + countFilmList) }} />}
                </>
            }
        </>
    )
}