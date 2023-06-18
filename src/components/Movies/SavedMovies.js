
import React, { useState } from "react";
// import { MovieButtonAdd } from "./MovieButtonAdd/MovieButtonAdd";
import { MoviesCard } from "./MoviesCard/MoviesCard";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import { SearchForm } from "./SearchForm/SearchForm";
// import { countFilmList } from "../../utils/constants";
export const SavedMovies = ({ loading, movies = [] }) => {

    const [filmList, setFilmList] = useState(3);

    return (
        < >
            <SearchForm />
            {loading ? <Preloader /> :
                <>
                    <MoviesCardList>
                        {
                            movies.slice(0, filmList).map(m => (
                                <MoviesCard key={m._id || m.id} movie={m} savedMovies={true} />
                            ))
                        }
                    </MoviesCardList>
                    {/* {filmList <= movies.length && <MovieButtonAdd hendleMovieButtonAdd={() => setFilmList(filmList + 4)} />} */}
                </>
            }
        </>
    )
}