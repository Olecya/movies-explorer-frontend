import { apiMovieOptions } from './constants';

class MoviesApi {
    constructor(apiOptions) {
        this._baseUrl = apiOptions.baseUrl;
        this._headers = apiOptions.headers;
    }

    _checkResponse = (res) => {
        if (res.ok) {
            return res.json()
        };
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies = () => {
        return fetch(`${this._baseUrl}`, {
            // credentials: 'include',
        })
            .then(this._checkResponse);
    }

    // getMoviesName = (name) => {
    //     return fetch(`${this._baseUrl}`, {
    //         credentials: 'include',
    //     })
    //         .then(this._checkResponse);
    // }
}

const moviesApi = new MoviesApi(apiMovieOptions);

export default moviesApi;