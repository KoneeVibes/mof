import styled from "styled-components";

export const CollectionsAreaWrapper = styled("div")(
    ({ theme }) => {
        return {
            display: "flex",
            flexDirection: "column",
            gap: "var(--flexGap)",
        }
    }
)

export const CollectionsAreaTableWrapper = styled.div(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        ".tableWrapper": {
            overflow: "auto",
        },
        ".exportButton": {
            display: "flex",
            justifyContent: "flex-end",
        },
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
            border: "1px solid rgba(33, 63, 125, 0.10)",
            padding: cardPadding,
            minWidth: "150px",
        },
        "& tbody": {
            position: "relative",
        },
        "tbody tr td:nth-child(1)": {
            textAlign: "left",
            width: "100%",
        },
        "tbody tr td:nth-child(2)": {
            textAlign: "center",
        },
        "& .dropdown-modal": {
            position: "absolute",
            background: "#FFFFFF",
            zIndex: 1,
            borderRadius: "8px",
            boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
            padding: "calc(var(--cardPadding)/2) 0",
            "& li": {
                listStyleType: "none",
                textAlign: "left",
                padding: "calc(var(--cardPadding)/4) calc(var(--cardPadding)/2)",
            },
            "& li:hover": {
                backgroundColor: "#059212",
                color: "#FFFFFF",
            }
        }
    }
})
