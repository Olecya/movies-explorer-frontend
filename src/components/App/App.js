import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
// import ProtectedRouteElement from "./ProtectedRoute";
// import { useLocation } from 'react-router';
import Footer from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../Movies/SavedMovies';
import { Profile } from '../Profile/Profile';
import api from '../../utils/Api';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Register } from '../Register/Register';

function App() {
    const [loggedIn, setLoggedIn] = useState(true);
    const [getMoviesSubmit, setGetMoviesSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!document.body.classList.contains('page')) {
            document.body.classList.add('page');
        }
    }, []);

    const getMovies = useCallback(async () => {
        try {
            setLoading(true);
            const resposne = await api.getMovies();
            setMovies(resposne);
            // console.log(resposne[0]);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
            setGetMoviesSubmit(false)
        }
    }, []);

    useEffect(() => {
        // console.log('getMoviesSubmit');
        getMoviesSubmit && loggedIn && getMovies();
    }, [loggedIn, getMoviesSubmit]);

    function handleUserOut() {
        setLoggedIn(false);
        // localStorage.setItem('mail', '');
        // localStorage.setItem('jwt', '');
        navigate("/");
    }

    return (
        <>
            <Header loggedIn={loggedIn} location={location} />
            <Routes>
                <Route path={`/`} element={<Main loggedIn={loggedIn} />} />
                <Route path={`/movies`} element={
                    <Movies loading={loading} movies={movies} location={location} onSubmit={() => setGetMoviesSubmit(true)} />
                } />
                <Route path={`/saved-movies`} element={
                    <SavedMovies loading={loading} movies={movies} location={location} onSubmit={() => setGetMoviesSubmit(true)} />
                } />
                <Route path={`/profile`} element={<Profile userOut={handleUserOut} />} />
                <Route path={`/sign-in`} element={<Register location={location} />} />
                <Route path={`/sign-up`} element={<Register location={location} />} />
                <Route path={`/not-found-page`} element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to={`/not-found-page`} replace />} />
            </Routes>
            <Footer location={location} />
        </>
    );
}

export default App;
