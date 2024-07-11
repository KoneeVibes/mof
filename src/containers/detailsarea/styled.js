import styled from "styled-components";
import { Card } from "../../components/card";

export const ProjectDetailsAreaWrapper = styled.div(() => {
    return`
        display: flex;
        flex-direction: column;
        gap: var(--flexGap);
    `
})

export const ProjectDetailCardWrapper = styled(Card)(() => {
    return{
        //Generic styles for the cards come here. 
        backgroundColor: "blue !important",   
    }
})