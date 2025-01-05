import React from 'react';
import { JumbotronWrapper } from "./styled";
import { H1 } from '../typography/styled';
import { BaseButton } from '../buttons';

export const Jumbotron = ({ entity, location, handleJumbotronButtonClick }) => {
    return (
        <JumbotronWrapper>
            <div className='entity-logo-div'>
                {/* parastatal logo goes in here */}
                <H1>{entity || ""}</H1>
                {(location === "projects table area") && (
                    <BaseButton
                        onClick={handleJumbotronButtonClick}
                    >
                        Edit Organization
                    </BaseButton>
                )}
            </div>
        </JumbotronWrapper>
    )
}