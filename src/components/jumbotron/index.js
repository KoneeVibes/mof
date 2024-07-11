import React from 'react';
import { JumbotronWrapper } from "./styled";
import sampleLogo from "../../assets/sampleEntityLogo.svg";
import { H1, H2, H3, Span, P } from '../typography/styled';

export const Jumbotron = () => {
    return (
        <JumbotronWrapper>
            {/* <H1>HELLO, MIRABEL</H1> */}
            <div className='entity-logo-div'>
                {/* parastatal logo goes in here */}
                <img src={sampleLogo} alt='entity-logo'></img>
            </div>
        </JumbotronWrapper>
    )
}