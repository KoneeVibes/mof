import styled from "styled-components";
import { Row } from "../flex/styled";

export const AvatarWrapper = styled(Row)(({ location }) => {
    return `
        align-items: center;
        justify-content: space-between;
        cursor: pointer;

        @media screen and (min-width: 0px) and (max-width: 768px){
            display: ${(location === "top-nav") ? "none" : "flex"};
        }

        @media screen and (min-width: 768px){
            display: ${(location === "side-nav") ? "none" : "flex"};
        }
    `
})