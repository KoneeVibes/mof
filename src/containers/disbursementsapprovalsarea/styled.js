import styled from "styled-components";

export const DisbursementsApprovalAreaWrapper = styled.div(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        display: "flex",
        flexDirection: "column",
        gap: "var(--flexGap)",

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
        },
        "td": {
            textAlign: "left",
            borderBottom: "1px solid rgba(33, 63, 125, 0.10)",
            padding: cardPadding,
        },
        "select": {
            padding: "0 !important",
            fontFamily: "Work Sans",
            fontWeight: 500,
            fontSize: "14px",
        }
    }
})