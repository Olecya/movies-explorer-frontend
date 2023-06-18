import React from 'react';
import { Link } from 'react-router-dom';
import './navigationlogo.css';
import logo from '../../images/logo.svg';

function NavigationLogo() {

    return (
        <Link to='/' >
            <img className="navigation__logo" src={logo} alt="Логотип" />
        </Link>
    );
}

export default NavigationLogo;