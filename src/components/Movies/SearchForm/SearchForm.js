import React, { useCallback, useEffect, useState } from "react";
import './searchForm.css';

export const SearchForm = ({ onSubmit, handleSearch, value }) => {
    const [word, setWord] = useState('');
    const [filterCheckbox, setFilterCheckbox] = useState(false);

    const handleChange = useCallback((e) => {
        const wordPattern = /(^[a-z]{2,}$)|(^[ёа-я]{2,}$)/i;
        if (wordPattern.test(e.target.value)) {
            setWord(e.target.value);
        } else {
            setWord('');
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(word);
    }

    const filterCheckboxButton = () => {
        //TODO filter
        setFilterCheckbox(!filterCheckbox);
    }

    return (
        < >
            <section className="searchForm">
                <form className="searchForm__form">
                    <input type="text" className="searchForm__input" defaultValue={value} placeholder="Фильм" required onChange={(e) => { handleChange(e) }} />
                    <button className={`searchForm__but-search ${word && "searchForm__but-search_activ"}`} type="submit" onClick={(e) => handleSubmit(e)} disabled={!Boolean(word)}>Найти</button>
                    
                    <span className={`searchForm__input-error ${!Boolean(word) && 'searchForm__input-error_active'}`} >{`Введите слово`}</span>
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