import React from 'react';
import { Link } from 'react-router-dom';
import { useInput } from '../../utils/useFormWithValidation';
import { InputForm } from '../InputForm/InputForm';
import NavigationLogo from '../NavigationLogo/NavigationLogo';
import './register.css';

export const Register = ({ onDataUser, location }) => {
    const name = useInput('', { isName: true });
    const email = useInput('', { isEmail: true });
    const password = useInput('', { minLength: 2 })

    const locationSignUp = () => {
        return location.pathname === `/sign-up`;
    }

    const buttonActiv = () => {
        return locationSignUp() ?
            (name.isNameError || email.isMailError || password.minLength) :
            (email.isMailError || password.minLength);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onDataUser({
            password: password.value,
            email: email.value,
            name: name.value
        });
    }

    return (
        <section className="register">
            <div className="register__link">
                <NavigationLogo />
            </div>
            <h2 className="register__title">{locationSignUp() ? "Добро пожаловать!" : "Рады видеть!"}</h2>
            <form className="register__form" onSubmit={handleSubmit}>
                {locationSignUp() &&
                    <InputForm
                        name="name"
                        classForm="register__form"
                        textLabel="Имя"
                        value={name.value}
                        onChange={(e) => name.onChange(e)}
                        valid={name.isNameError}
                        textSpan={name.messageError}
                    />
                }
                <InputForm
                    name="email"
                    classForm="register__form"
                    textLabel="E-mail"
                    value={email.value}
                    onChange={(e) => email.onChange(e)}
                    valid={email.isMailError}
                    textSpan={email.messageError}
                />
                <InputForm
                    name="password"
                    classForm="register__form"
                    autoComplete="on"
                    textLabel="Пароль"
                    value={password.value}
                    onChange={(e) => password.onChange(e)}
                    valid={password.minLength}
                    textSpan={password.messageError}
                />
                <button className="register__but" disabled={buttonActiv()}>{locationSignUp() ? "Зарегистрироваться" : "Войти"}</button>
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