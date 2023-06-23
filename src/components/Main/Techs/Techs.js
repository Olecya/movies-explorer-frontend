import React from "react";
import { Title } from "../Title/Title";
import './techs.css';

export const Techs = () => {

    return (
        <section className="techs">
            <Title text={'Технологии'} />
            <h2 className="techs__subtitle">7 технологий</h2>
            <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном
                проекте</p>
            <ul className="techs__tehs">
                <li className="techs__name">HTML</li>
                <li className="techs__name">CSS</li>
                <li className="techs__name">JS</li>
                <li className="techs__name">React</li>
                <li className="techs__name">Git</li>
                <li className="techs__name">Express.js</li>
                <li className="techs__name">mongoDB</li>
            </ul>
        </section>
    )
}