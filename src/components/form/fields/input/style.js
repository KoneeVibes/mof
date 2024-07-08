import styled from "styled-components";
import { Row } from "../../../flex/styled";

export const BaseInput = styled("input")`
    ${({ cardPadding = 'var(--cardPadding)', width }) => {
        return {
            padding: `calc(${cardPadding}/2.5)`,
            marginInlineStart: "0.5rem",
            border: "none",
            outline: "none",
            width: width || "auto",
        }
    }}
`

export const SearchButtonWrapper = styled("button")(
    ({ cardPadding = 'var(--cardPadding)' }) => {
        return `
            padding: calc(${cardPadding}/2.5);
            background-color: #059212;
            border: none;
            border-radius: 8px;
    `
    })

export const InputFieldWrapper = styled(Row)(({width}) => {
    return{
        border: "1px solid #213F7D",
        borderRadius: "10px",
        width: width || "auto",
    }
})