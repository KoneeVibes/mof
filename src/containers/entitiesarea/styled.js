import styled from "styled-components";

export const EntitiesAreaWrapper = styled.div(() => {
    return `
        
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
        },
        "th": {
            textAlign: "left",
            textTransform: "uppercase",
            padding: cardPadding,
            borderBottom: "1px solid rgba(33, 63, 125, 0.10)",
        },
        "td": {
            textAlign: "center",
            borderBottom: "1px solid rgba(33, 63, 125, 0.10)",
            padding: cardPadding,
        },
        ".parastatal": {
            textAlign: "left",
        },
    }
})