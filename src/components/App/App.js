import './App.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
// import ProtectedRouteElement from "./ProtectedRoute";
import Footer from '../Footer/Footer';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../Movies/SavedMovies';
import { Profile } from '../Profile/Profile';
import api from '../../utils/Api';
import { NotFoundPage } from '../NotFoundPage/NotFoundPage';
import { Register } from '../Register/Register';

// Для проверки работы предлогается сначала посмотреть 
// версию для уже зарегистрированнного пользователя.
// Для проверки главной страницы с навигацинным баром 
// гостевого режима предлогается перейти на роут "/profile"
// и нажать кнопку выйти.
// Так же для удобства проверки можно включать и выключать
// строки 23 и 24 отвечающие за логирование.

function App() {
    const [loggedIn, setLoggedIn] = useState(true);
    // const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
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
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loggedIn && getMovies();
    }, [loggedIn]);

    function handleUserOut() {
        setLoggedIn(false);
        // localStorage.setItem('mail', '');
        // localStorage.setItem('jwt', '');
        navigate("/");
    }

    return (
        <>
            <Header loggedIn={loggedIn} />
            <Routes>
                <Route path={`/`} element={<Main loggedIn={loggedIn} />} />
                <Route path={`/movies`} element={<Movies loading={loading} movies={movies} />} />
                <Route path={`/saved-movies`} element={
                    <SavedMovies loading={loading} movies={movies} />
                } />
                <Route path={`/profile`} element={<Profile userOut={handleUserOut} />} />
                <Route path={`/sign-in`} element={<Register />} />
                <Route path={`/sign-up`} element={<Register />} />
                <Route path={`/not-found-page`} element={<NotFoundPage />} />
                <Route path='*' element={<Navigate to={`/not-found-page`} replace />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
