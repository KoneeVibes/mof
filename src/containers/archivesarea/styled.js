import styled from "styled-components";
import { Column } from "../../components/flex/styled";

export const ArchivesAreaWrapper = styled(Column)(() => {
    return {

    }
})

export const ArchivesAreaTableWrapper = styled.div(({ cardPadding = "var(--cardPadding)" }) => {
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
        "tbody tr td:nth-child(1)": {
            textAlign: "left",
        },
    }
})