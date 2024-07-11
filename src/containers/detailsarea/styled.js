import styled from "styled-components";
import { CardWrapper } from "../../components/card/styled";

export const ProjectDetailsAreaWrapper = styled.div(() => {
    return `
        display: flex;
        flex-direction: column;
        gap: var(--flexGap);
    `
})

export const ProjectDetailCardWrapper = styled(CardWrapper)(() => {
    return {
        //Generic styles for the cards come here.
        backgroundColor: "eeeeee",
        padding: "5rem",
        textAlign: "justify",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",

        "h1":{
            textDecoration: "underline",  
        }
    }
})