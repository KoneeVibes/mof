import styled from "styled-components";

export const EntitiesAreaWrapper = styled.div(({ flexGap = "var(--flexGap)" }) => {
    return `
        display: flex;
        flex-direction: column;
        gap: ${flexGap}; 
    `
})

export const EntitiesTableWrapper = styled.div(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        overflow: "auto",
        "table": {
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            borderCollapse: "collapse",
            cursor: "pointer",
        },
        "th": {
            textAlign: "left",
            textTransform: "uppercase",
            padding: cardPadding,
            borderBottom: "1px solid rgba(33, 63, 125, 0.10)",
            minWidth: "150px",
        },
        "td": {
            textAlign: "left",
            borderBottom: "1px solid rgba(33, 63, 125, 0.10)",
            padding: cardPadding,
            minWidth: "150px",
        },
        "tbody tr td:nth-child(1)": {
            textAlign: "left",
        },
        "select": {
            width: "100%",
        }
    }
})