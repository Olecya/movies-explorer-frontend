import { apiMainOptions } from './constants';

class MainApi {
    constructor(apiOptions) {
        this._baseUrl = apiOptions.baseUrl;
        this._headers = apiOptions.headers;
    }

    _checkResponse = (res) => {
        if (res.ok) {
            return res.json();
        };
        return Promise.reject(`Ошибка: ${{ res }}`);
    }

    _authHeders = () => {
        let a = this._headers;
        a['authorization'] = `Bearer ${localStorage.getItem('jwt')}`;
        return a;
    }

    getUsersMe = () => {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._authHeders(),
        })
            .then(this._checkResponse);
    }

    patchUsersMe = async (profileJSON) => {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._authHeders(),
            body: JSON.stringify({
                name: profileJSON.name,
                email: profileJSON.email,
            })
        });
        return this._checkResponse(res);
    }

    postMovies = (movie) => {
        const { nameEN,
            nameRU,
            id,
            trailerLink,
            image,
            description,
            year,
            duration,
            director,
            country, } = movie;

        // console.log({
        //     nameEN,
        //     nameRU,
        //     movieId: id,
        //     thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
        //     trailerLink,
        //     image: `https://api.nomoreparties.co${image.url}`,
        //     description,
        //     year,
        //     duration,
        //     director,
        //     country,
        // })
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: this._authHeders(),
            body: JSON.stringify({
                nameEN: nameEN,
                nameRU: nameRU,
                movieId: id,
                thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url}`,
                trailerLink: trailerLink,
                image: `https://api.nomoreparties.co${image.url}`,
                description: description,
                year: year,
                duration: duration,
                director: director,
                country: country,
            })
        })
            .then(this._checkResponse)
    }

    deleteMoviesId = (moviesId) => {
        return fetch(`${this._baseUrl}/movies/${moviesId}`, {
            method: 'DELETE',
            headers: this._authHeders(),
        })
            .then(this._checkResponse);
    }

    getMovies = async () => {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: this._authHeders(),
        })
            .then(this._checkResponse);
    }
}

const mainApi = new MainApi(apiMainOptions);

export default mainApi;