import styled from "styled-components";

export const TextAreaWrapper = styled("textarea")(() => {
    return `
        border-radius: 10px;
        // background-color: EEEE;
        border: none;
        min-height: 7rem;
        cursor: text;
        display: block;
        padding: calc(var(--cardPadding) / 2.5);
        backgroundColor: #FFFFFF;
        @supports (width: -webkit-fill-available) {
            width: -webkit-fill-available;
        }
        @supports (width: -moz-available) {
            width: -moz-available;
        }
    `
})
