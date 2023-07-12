import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import Footer from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../Movies/SavedMovies';
import { Profile } from '../Profile/Profile';
import { Register } from '../Register/Register';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import { authorize, register, checkToken } from '../../utils/auth';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState({});
    const [getMoviesSubmit, setGetMoviesSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [myMovies, setMyMovies] = useState([]);

    let location = useLocation();
    const navigate = useNavigate();

    const getUser = useCallback(async () => {
        await mainApi.getUsersMe()
            .then((res) => {
                // console.log(res);
                setCurrentUser(res);
                setLoggedIn(true);
            })
            .catch((err) => console.log(err))
    }, []);

    const getMyMovies = useCallback(async () => {
        mainApi.getMovies()
            .then(r => setMyMovies(r))
            .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
        loggedIn && getUser();
        loggedIn && getMyMovies()
    }, [loggedIn]);

    useEffect(() => {
        if (!document.body.classList.contains('page')) {
            document.body.classList.add('page');
        }
    }, []);

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            checkToken(jwt)
                .then((r) => {
                    if (r) {
                        // console.log('checkToken')
                        setLoggedIn(true);
                    }
                })
                .then(() => { navigate("/") })
                .catch((err) => console.log(err));
        }
    }, []);

    const getMovies = useCallback(async () => {
        let resposne;
        if (getMoviesSubmit) {
            try {
                setLoading(true);
                resposne = await moviesApi.getMovies();
            } catch (err) {
                console.log(err);
            } finally {
                setMovies(resposne);
                setLoading(false);
                setGetMoviesSubmit(false)
            }
        }
    }, [getMoviesSubmit]);

    useEffect(() => {
        // console.log('getMoviesSubmit');
        getMoviesSubmit && loggedIn && getMovies();
    }, [loggedIn, getMoviesSubmit]);

    function handleUserOut() {
        setLoggedIn(false);
        localStorage.setItem('mail', '');
        localStorage.setItem('jwt', '');
        localStorage.setItem('saveSearchWord', '');
        localStorage.setItem('saveShortFilm', '');
        navigate("/");
    }
    function handleUpdateUser(dataUser) {
        mainApi.patchUsersMe(dataUser)
            .then((res) => setCurrentUser(res))
            .catch((err) => console.log(err));
    }
    function handleSignUp({ email, password, name }) {
        // console.log(email, password, name)
        register(email, password, name)
            .then(() => { handleSignIn({ email, password }) })
            .catch((err) => console.log(err))
    }
    function handleSignIn({ email, password }) {
        authorize(password, email)
            .then((data) => {
                // console.log(data.token);
                if (data.token) {
                    setLoggedIn(true);
                    localStorage.setItem('mail', email);
                    localStorage.setItem('jwt', data.token);
                } else {
                    return;
                }
            })
            .then(() => navigate("/", { replace: true }))
            .catch((err) => console.log(err))
    }

    function handleMovietoggleLike(movie, metod) {
        // console.log('metod')
        if (metod === 'POST') {
            // console.log('post')
            mainApi.postMovies(movie)
                .catch((err) => console.log(err))
                .finally(getMyMovies)
        }
        if (metod === 'DELETE') {
            // console.log(movie._id);
            mainApi.deleteMoviesId(movie._id)
                .catch((err) => console.log(err))
                .finally(getMyMovies);
            // console.log('delete')
        } else { return };
    }

    return (
        <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
            <Header loggedIn={loggedIn} location={location} />
            <Routes>
                <Route path={`/`} element={<Main loggedIn={loggedIn} />} />

                <Route path={`/movies`} element={
                    <ProtectedRouteElement loggedIn={loggedIn} element={
                        <Movies loading={loading}
                            movies={movies}
                            myMovies={myMovies}
                            location={location}
                            onSubmit={() => setGetMoviesSubmit(true)}
                            onMovieLike={handleMovietoggleLike} />
                    } />
                } />

                <Route path={`/saved-movies`} element={
                    <ProtectedRouteElement loggedIn={loggedIn} element={
                        <SavedMovies loading={loading}
                            movies={movies}
                            myMovies={myMovies}
                            location={location}
                            onSubmit={() => setGetMoviesSubmit()}
                            onMovieLike={handleMovietoggleLike} />
                    } />
                } />

                <Route path={`/profile`} element={
                    <ProtectedRouteElement loggedIn={loggedIn} element={
                        <Profile userOut={handleUserOut} updateUser={handleUpdateUser} />
                    } />} />
                <Route path={`/sign-in`} element={<Register location={location} onDataUser={handleSignIn} />} />
                <Route path={`/sign-up`} element={<Register location={location} onDataUser={handleSignUp} />} />
                <Route path={`/not-found-page`} element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to={`/not-found-page`} replace />} />
            </Routes>
            <Footer location={location} />
        </ CurrentUserContext.Provider>
    );
}

export default App;
