import React, { useState } from "react";
import './searchForm.css';

export const SearchForm = ({ onSubmit, handleSearch }) => {
    const [word, setWord] = useState('');
    const [filterCheckbox, setFilterCheckbox] = useState(false);

    const handleChange = (e) => {
        const wordPattern = /(^[a-z]{2,}$)|(^[ёа-я]{2,}$)/i;
        // console.log(wordPattern.test(e.target.value))
        wordPattern.test(e.target.value) ? setWord(e.target.value) : setWord('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(word);
        // console.log(word);
        // handleSearch(word);
    }

    const filterCheckboxButton = () => {
        //TODO filter
        setFilterCheckbox(!filterCheckbox);
    }

    return (
        < >
            <section className="searchForm">
                <form className="searchForm__form">
                    <input type="text" className="searchForm__input" placeholder="Фильм" required onChange={(e) => { handleChange(e) }} />
                    <button className={`searchForm__but-search ${word && "searchForm__but-search_activ"}`} type="submit" onClick={(e) => handleSubmit(e)} disabled={!Boolean(word)}>Найти</button>
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