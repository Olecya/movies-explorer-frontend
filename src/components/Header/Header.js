import React from 'react';

import Navigation from '../Navigation/Navigation';
import './header.css';

export const Header = ({ loggedIn, location }) => {

    let showNavigation = () => {
        switch (location.pathname) {
            case `/sign-in`:
            case `/sign-up`:
            case `/not-found-page`:
                return false;
            default:
                return true;
        }
    }

    return (
        <header className={`header ${location.pathname !== '/' ? '' : 'header__background'}`} >
            {showNavigation() && <Navigation loggedIn={loggedIn} />}
        </header>
    )
}
