import React, { useState } from "react";
import './searchForm.css';

export const SearchForm = () => {

    const [filterCheckbox, setFilterCheckbox] = useState(false);

    const filterCheckboxButton = () => {
        //TODO filter
        setFilterCheckbox(!filterCheckbox);
    }

    return (
        < >
            <section className="searchForm">
                <form className="searchForm__form">
                    <input type="text" className="searchForm__input" placeholder="Фильм" required />
                    <button className="searchForm__but-search" type="submit">Найти</button>
                </form>
                <div className="searchForm__filterCheckbox">
                    <button
                        className={`searchForm__button ${filterCheckbox && "searchForm__button_activ"}`}
                        onClick={() => filterCheckboxButton()}
                    />
                    <p className={`searchForm__filterCheckbox-text`}>Короткометражки</p>
                </div>
            </section>
        </>
    )
}