import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import NavigationLogo from '../NavigationLogo/NavigationLogo';
import PopupNav from './PopupNav/PopupNav';

function Navigation({ loggedIn }) {

    const [width, setWidth] = useState(window.innerWidth);
    const [popupNavOpened, setPopupNavOpened] = useState(false);

    useEffect(() => {
        const handleResize = (event) => {
            setWidth(event.target.innerWidth);
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className="navigation">
            <NavigationLogo />
            {loggedIn ?
                (width > 768 ?
                    <>
                        <div >
                            <Link className="navigation__film" to="/movies" >Фильмы</Link>
                            <Link className="navigation__film" to="/saved-movies" >Сохранённые фильмы</Link>
                        </div>
                        <div className="navigation__account">
                            <Link className="navigation__email" to='/profile'>Аккаунт</Link>
                            <Link to='/profile' className="navigation__icon" />
                        </div>
                    </>
                    :
                    <>
                        <button className="navigation__bar" onClick={() => setPopupNavOpened(true)} />
                        <PopupNav isOpen={popupNavOpened} onClose={() => setPopupNavOpened(false)} />
                    </>

                )
                :
                <div className="navigation__header">
                    <Link to='/sign-up' className="navigation__registration">Регистрация</Link>
                    <Link to='/sign-in' className="navigation__enter" >Войти</Link>
                </div>
            }
        </nav>
    );
}

export default Navigation;