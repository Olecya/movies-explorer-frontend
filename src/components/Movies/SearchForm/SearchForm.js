import React, { useCallback, useEffect, useState } from "react";
import './searchForm.css';

export const SearchForm = ({ onSubmit, filterCheckbox, value, savedMovies }) => {
    const [word, setWord] = useState('');
    const [filterCheckboxState, setFilterCheckbox] = useState(false);

    useEffect(() => {
        if (!savedMovies) {
            const w = localStorage.getItem('saveSearchWord');
            const a = localStorage.getItem('saveShortFilm')
            w && setWord(w);
            a && setFilterCheckbox(a);
        }
    }, [])

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
        setFilterCheckbox(!filterCheckboxState);
        filterCheckbox(!filterCheckboxState);
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
                        className={`searchForm__button ${!filterCheckboxState && "searchForm__button_activ"}`}
                        onClick={() => filterCheckboxButton()}
                    />
                    <p className={`searchForm__filterCheckbox-text`}>Короткометражки</p>
                </div>
            </section>
        </>
    )
}