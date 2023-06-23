import React from "react";
import { Link } from "react-router-dom";
import './portfolio.css';

export const Portfolio = () => {

    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <div className="portfolio__link">
                <Link className="portfolio__link-text" onClick={() => window.open('https://github.com/Olecya/how-to-learn', '_blank')}>Статичный сайт</Link>
                <button className="portfolio__link-but" onClick={() => window.open('https://github.com/Olecya/how-to-learn', '_blank')}></button>
            </div>
            <div className="portfolio__link">
                <Link className="portfolio__link-text" onClick={() => window.open('https://github.com/Olecya/russian-travel', '_blank')}>Адаптивный сайт</Link>
                <button className="portfolio__link-but" onClick={() => window.open('https://github.com/Olecya/russian-travel', '_blank')}></button>
            </div>
            <div className="portfolio__link">
                <Link className="portfolio__link-text" onClick={() => window.open('https://github.com/Olecya/react-mesto-api-full-gha', '_blank')}>Одностраничное приложение</Link>
                <button className="portfolio__link-but" onClick={() => window.open('https://github.com/Olecya/react-mesto-api-full-gha', '_blank')}></button>
            </div>
        </section>
    )
}