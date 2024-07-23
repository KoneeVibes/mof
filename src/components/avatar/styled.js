import styled from "styled-components";
import { Row } from "../flex/styled";
import { CardWrapper } from "../card/styled";

export const AvatarWrapper = styled(Row)(({ location }) => {
    return `
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        position: relative;
        z-index: 1;

        @media screen and (min-width: 0px) and (max-width: 768px){
            display: ${(location === "top-nav") ? "none" : "flex"};
        }

        @media screen and (min-width: 768px){
            display: ${(location === "side-nav") ? "none" : "flex"};
        }
    `
})

export const AvatarModalWrapper = styled(CardWrapper)(({ isavatarmodalopen }) => {
    return `
        display: ${isavatarmodalopen ? "block" : "none"};
        padding: var(--cardPadding);
        padding-bottom: calc(var(--cardPadding)/4);
        position: absolute;
        top: 50%;
        right: 0;
        z-index: -1;

        p{
            color: #059212;
        }

        p:hover {
            color: red;
        }
    `
})