import React from 'react';
import { JumbotronWrapper } from "./styled";
import entitiesPicture from "../../assets/jumbotronEntititiesPicture.svg";
export const Jumbotron = () => {
    return (
        <JumbotronWrapper>
            <div className='entity-logo-div'>
                {/* parastatal logo goes in here */}
                <img src={entitiesPicture}></img>
            </div>
            <div className='entities-picture'></div>
        </JumbotronWrapper>
    )
}