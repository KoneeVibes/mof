import styled from "styled-components";

export const SelectFieldWrapper = styled("select")`
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
