import styled from "styled-components";

export const TextAreaWrapper = styled("textarea")(() => {
    return `
        border-radius: 10px;
        // background-color: #EEEEEE;
        width: -webkit-fill-available;
        border: none;
        min-height: 7rem;
        cursor: text;
        display: block;
    `
})
