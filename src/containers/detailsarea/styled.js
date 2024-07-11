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
        backgroundColor: "blue",
    }
})