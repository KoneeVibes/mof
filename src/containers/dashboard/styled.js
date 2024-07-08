// import { useContext } from "react";
import styled from "styled-components";
// import { Context } from "../../context";

export const DashboardWrapper = styled("div")(() => {
    return {

    }
})

export const MainAreaWrapper = styled("div")(({ cardPadding = "var(--cardPadding)" }) => {
    // const { isMenuOpen } = useContext(Context);
    return `
        position: absolute;
        top: calc(var(--navHeight));
        left: ${cardPadding};
        padding: calc(${cardPadding}) calc(${cardPadding}) calc(${cardPadding} * 2.5)  0;
        width: -webkit-fill-available;

        @media screen and (min-width: 768px){
            left: calc(var(--navWidth) + ${cardPadding});
        }
    `
})