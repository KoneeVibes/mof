import styled from "styled-components";

export const TextAreaWrapper = styled("textarea")(() => {
    return `
        border-radius: 10px;
        border: none;
        min-height: 7rem;
        cursor: text;
        display: block;
        padding: calc(var(--basic-padding) / 2.5);
        backgroundColor: var(--light-color);
        @supports (width: -webkit-fill-available) {
            width: -webkit-fill-available;
        }
        @supports (width: -moz-available) {
            width: -moz-available;
        }
    `
})
