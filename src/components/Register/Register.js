import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormWithValidation } from '../../utils/useFormWithValidation';
import { InputForm } from '../InputForm/InputForm';
import NavigationLogo from '../NavigationLogo/NavigationLogo';
import './register.css';

export const Register = ({ onDataUser, location }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameUser, setNameUser] = useState('');
    const validationName = useFormWithValidation(nameUser, "name")
    // const valid = useFormWithValidation({});

    const locationSignUp = () => {
        return location.pathname === `/sign-up`;
    }

    const buttonActiv = () => {
        return locationSignUp() ? !(email && password && nameUser) : !(email && password);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onDataUser({
            password: password,
            email: email,
            name: nameUser
        });
    }

    const handleChengeForm = useCallback((e) => {
        setNameUser(e.target.value)
        // console.log(e.target.name)
        // onchengeInput(e.value, e.target.name);
        console.log(validationName.isValid, validationName.messageError)
        // setNameUser(event.target.value)
    }, [])

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
                        value={nameUser} onChange={(event) => { handleChengeForm(event) }}
                        textLabel="Имя"
                        valid={validationName.isNameError}
                        // textSpan="Допускается имя длинной от 2 до 30 символов."
                        textSpan={validationName.messageError} />
                }
                <InputForm
                    name="email"
                    classForm="register__form"
                    value={email} onChange={(event) => { setEmail(event.target.value) }}

                    textLabel="E-mail"
                    textSpan="Неверный адрес электронной почты." />
                <InputForm
                    name="password"
                    classForm="register__form"
                    value={password} onChange={(event) => { setPassword(event.target.value) }}
                    autoComplete="on"
                    textLabel="Пароль"
                    textSpan="Что-то пошло не так..." />
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