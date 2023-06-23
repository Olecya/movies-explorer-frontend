import React from "react";
import { Link } from "react-router-dom";
import { Title } from "../Title/Title";
import './aboutMe.css';
import photo from '../../../images/photo.png';

export const AboutMe = () => {

    return (
        <section className="aboutMe">
            <Title text={'Студент'} />
            <div className="aboutMe__students">
                <div className="aboutMe__students-biography">
                    <h2 className="aboutMe__name">Виталий</h2>
                    <h2 className="aboutMe__title">Фронтенд-разработчик,30 лет</h2>
                    <p className="aboutMe__text">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                        и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в
                        компании
                        «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с
                        постоянной работы.</p>
                    <Link className="aboutMe__git" to="https://github.com/Olecya">Github</Link>
                </div>
                <div>
                    <img className="aboutMe__photo" src={photo} alt="Логотип" />
                </div>
            </div>
        </section>
    )
}