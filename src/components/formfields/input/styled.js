import styled from "styled-components";
import { Row } from "../../flex/styled";

export const BaseInputWrapper = styled("input")`
    ${({ cardPadding = 'var(--cardPadding)', width, margininlinestart }) => {
        return {
            padding: `calc(${cardPadding}/2.5)`,
            marginInlineStart: margininlinestart || "0",
            border: "none",
            outline: "none",
            width: width || "auto",
            fontFamily: "AvenirNext",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "10px",
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

export const InputFieldWrapper = styled(Row)(({ width }) => {
    return {
        border: "1px solid #213F7D",
        borderRadius: "10px",
        width: width || "auto",
    }
})
