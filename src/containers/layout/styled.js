import styled from "styled-components";

export const LayoutWrapper = styled("div")(() => {
    return {

    }
})

export const MainAreaWrapper = styled("div")(({ cardPadding = "var(--cardPadding)" }) => {
    return `
        position: absolute;
        top: calc(var(--navHeight));
        left: ${cardPadding};
        right: ${cardPadding};
        padding: calc(${cardPadding}) 0 calc(${cardPadding} * 2.5)  0;

        @media screen and (min-width: 768px){
            left: calc(var(--navWidth) + ${cardPadding});
        }

        @supports (width: -webkit-fill-available) {
            width: -webkit-fill-available;
        }

        @supports (width: -moz-available) {
            width: -moz-available;
        }
    `
})