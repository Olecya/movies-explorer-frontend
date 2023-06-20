import React from 'react';
import { Link } from 'react-router-dom';
import { InputForm } from '../InputForm/InputForm';
import NavigationLogo from '../NavigationLogo/NavigationLogo';
import './register.css';

export const Register = ({location}) => {    

    const locationSignUp = () => {
        return location.pathname === `/sign-up`;
    }

    return (
        <section className="register">
            <div className="register__link">
                <NavigationLogo />
            </div>
            <h2 className="register__title">{locationSignUp() ? "Добро пожаловать!" : "Рады видеть!"}</h2>
            <form className="register__form">
                {locationSignUp() &&
                    <InputForm
                        name="name"
                        classForm="register__form"
                        valueDef="Виталий"
                        textLabel="Имя"
                        textSpan="Допускается имя длинной от 2 до 30 символов." />
                }
                <InputForm
                    name="email"
                    classForm="register__form"
                    valueDef="email"
                    textLabel="E-mail"
                    textSpan="Неверный адрес электронной почты." />
                <InputForm
                    name="password"
                    classForm="register__form"
                    valueDef="password"
                    textLabel="Пароль"
                    textSpan="Что-то пошло не так..." />
                <button className="register__but" disabled>{locationSignUp() ? "Зарегистрироваться" : "Войти"}</button>
            </form>
            <p className="register__text">{`${locationSignUp() ? "Уже" : "Еще не"} зарегистрированы?`}
                <Link
                    to={locationSignUp() ? '/sign-in' : `/sign-up`}
                    className="register__text-link" >
                    {locationSignUp() ? "Войти" : "Зарегистрироваться"}
                </Link>
            </p>
        </section>
    )
}