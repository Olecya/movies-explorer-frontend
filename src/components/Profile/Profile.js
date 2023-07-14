import React, { useContext } from 'react';
import './profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useInput } from '../../utils/useFormWithValidation';

export const Profile = ({ userOut, updateUser }) => {

    const [currentUser] = useContext(CurrentUserContext);
    const email = useInput(currentUser.email, { isEmail: true })
    const name = useInput(currentUser.name, { isName: true })

    function handleSubmit(e) {
        e.preventDefault();
        updateUser({
            name: name.value,
            email: email.value
        });
    }

    function disabledProfileEdit() {
        if (name.isNameError || email.isMailError) return true;
        if (name.value === currentUser.name && email.value === currentUser.email) { return true };
        return false;
    }

    return (
        < >
            <section className="profile">
                <h2 className="profile-title">{`Привет, ${currentUser.name}!`}</h2>
                <form className="profile__form">
                    <span className={`profile__form-input_error ${name.isNameError && `profile__form-input_error-activ`} `} id={name}>{name.messageError}</span>
                    <label className="profile__form-label">Имя
                        <input type="name" className="profile__form-input" onChange={(e) => name.onChange(e)} value={`${name.value}`} placeholder="&nbsp;" />
                    </label>
                    <label className="profile__form-label">E-mail
                        <input type="email" className="profile__form-input" onChange={(e) => email.onChange(e)} value={`${email.value}`} placeholder="&nbsp;" />
                    </label>
                    <span className={`profile__form-input_error ${email.isMailError && `profile__form-input_error-activ`} `} id={name}>{email.messageError}</span>
                </form>
                <div className="profile__but-box">
                    <button className="profile__but-edit"
                        onClick={e => handleSubmit(e)}
                        disabled={disabledProfileEdit()}
                        style={disabledProfileEdit() ? { color: '#a09d9d' } : { color: '#FFFFFF' }}
                    >Редактиовать</button>
                    <button className="profile__but-exit" onClick={userOut}>Выйти из аккаунта</button>
                </div>
            </section>
        </>
    )
}