import React, { useRef } from 'react';
import { AboutMe } from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import { Portfolio } from "./Portfolio/Portfolio";
import { Promo } from "../Main/Promo/Promo";
import { Techs } from "./Techs/Techs";

export const Main = () => {

    const myRef = useRef(null);
    const scrollToMyRef = () => { myRef.current?.scrollIntoView({ behavior: 'smooth' }) }

    return (
        <main >
            <Promo aboutProjectScroll={scrollToMyRef} />
            <AboutProject ref={myRef} />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    )
};