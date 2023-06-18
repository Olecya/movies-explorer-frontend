import React from 'react';
import './profile.css';

export const Profile = ({userOut}) => {

    return (
        < >
            <section className="profile">
                <h2 className="profile-title">Привет, Виталий!</h2>
                <form className="profile__form">
                    <label className="profile__form-label">Имя
                        <input type="name" className="profile__form-input" defaultValue="Виталий" placeholder="&nbsp;" />
                    </label>
                    <label className="profile__form-label">E-mail
                        <input type="email" className="profile__form-input" defaultValue="mail" placeholder="&nbsp;" />
                    </label>
                </form>
                <div className="profile__but-box">
                    <button className="profile__but-edit">Редактиовать</button>
                    <button className="profile__but-exit" onClick={userOut}>Выйти из аккаунта</button>
                </div>
            </section>
        </>
    )
}