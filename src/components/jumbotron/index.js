import React from 'react';
import { JumbotronWrapper } from "./styled";
import sampleLogo from "../../assets/sampleEntityLogo.svg";

export const Jumbotron = () => {
    return (
        <JumbotronWrapper>
            <div className='entity-logo-div'>
                {/* parastatal logo goes in here */}
                <img src={sampleLogo} alt='entity-logo'></img>
            </div>
        </JumbotronWrapper>
    )
}