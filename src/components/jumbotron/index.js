import React from 'react';
import { JumbotronWrapper } from "./styled";
import { H1 } from '../typography/styled';

export const Jumbotron = ({ entity }) => {
    return (
        <JumbotronWrapper>
            <div className='entity-logo-div'>
                {/* parastatal logo goes in here */}
                <H1>{entity || ""}</H1>
            </div>
        </JumbotronWrapper>
    )
}