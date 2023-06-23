import React from 'react';
import { AboutMe } from "./AboutMe/AboutMe";
import { AboutProject } from "./AboutProject/AboutProject";
import { Portfolio } from "./Portfolio/Portfolio";
import { Promo } from "../Main/Promo/Promo";
import { Techs } from "./Techs/Techs";

export const Main = () => {

    return (
        <main >
            <Promo />
            <AboutProject />
            <Techs />
            <AboutMe />
            <Portfolio />
        </main>
    )
};