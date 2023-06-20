import React, { useState } from "react";
import './searchForm.css';

export const SearchForm = () => {
    const [word, setWord] = useState('Ok');
    const [filterCheckbox, setFilterCheckbox] = useState(false);
// /(^[a-z]{2,}$\b)|([\u0401\u0451\u0410-\u044f]$\b)/i;
    const handleChange = (e) => {
        // const wordPattern = /(^[a-z]{2,}$)|(^[ёа-я]{2,}$)/;
        // console.log(wordPattern.test(e.target.value))
        // wordPattern.test(e.target.value) ? setWord(e.target.value) : setWord('');        
    }

    const handleSubmit =(e) => {
        // e.preventDefault();
        // console.log(word);
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
                    <button className={`searchForm__but-search ${word && "searchForm__but-search_activ"}`} type="submit" onClick={(e)=>handleSubmit(e)}>Найти</button>
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