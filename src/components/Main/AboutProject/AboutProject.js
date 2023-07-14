import React, { forwardRef } from 'react';
import './aboutProject.css';
import { Title } from "../Title/Title"

function AboutProject({ }, myRef) {
    return (

        <section className="aboutProject" ref={myRef}>
            <Title text={`О проекте`} />
            <div className="aboutProject__container">
                <div className="aboutProject__container-flex">
                    <h3 className="aboutProject__subtitle">Дипломный проект включал 5 этапов</h3>
                    <p className="aboutProject__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
                        финальные доработки.</p>
                </div>
                <div className="aboutProject__container-flex">
                    <h3 className="aboutProject__subtitle">На выполнение диплома ушло 5 недель</h3>
                    <p className="aboutProject__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать,
                        чтобы
                        успешно защититься.</p>
                </div>
            </div>
            <div className="aboutProject__chart">
                <div className="aboutProject__chart-flex">
                    <p className="aboutProject__chart-week aboutProject__chart-green">1 неделя</p>
                    <p className="aboutProject__chart-week aboutProject__chart-week_gray">Back-end</p>
                </div>
                <div className="aboutProject__chart-weeks">
                    <p className="aboutProject__chart-weeks aboutProject__chart-gray">4 недели</p>
                    <p className="aboutProject__chart-weeks aboutProject__chart-week_gray">Front-end</p>
                </div>
            </div>
        </section>
    )
}

export default forwardRef(AboutProject);