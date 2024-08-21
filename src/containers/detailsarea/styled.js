import styled from "styled-components";
import { CardWrapper } from "../../components/card/styled";
import { BaseButton } from "../../components/buttons/styled";
import { Row } from "../../components/flex/styled";

export const ProjectDetailsAreaWrapper = styled.div(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        display: "flex",
        flexDirection: "column",
        gap: "var(--flexGap)",
        position: "relative",
        ".tableWrapper": {
            overflow: "auto",
        },
        ".exportButton": {
            display: "flex",
            justifyContent: "flex-end",
        },
        ".filterField": {
            width: "auto",
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
        },
        "td": {
            textAlign: "left",
            borderBottom: "1px solid rgba(33, 63, 125, 0.10)",
            padding: cardPadding,
        },
        ".card-component": {
            padding: cardPadding,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }
    }
})

export const ProjectDetailCardWrapper = styled(CardWrapper)(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        padding: cardPadding,
        textAlign: "justify",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",

        "h1": {
            textDecoration: "underline",
        },

        "p": {
            fontSize: "16px"
        }
    }
})

export const ProjectDetailBaseButton = styled(BaseButton)(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        width: "fit-content",
        padding: `calc(${cardPadding}/2) calc(${cardPadding})`,

    }
})

export const ProjectDetailActionRow = styled(Row)(() => {
    return {
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
        flexWrap: "wrap",
    }
})

export const ProjectDetailEditModal = styled(CardWrapper)(({ display, cardPadding = "var(--cardPadding)" }) => {
    return {
        position: "absolute",
        top: "100%",
        right: 0,
        display: display,
        zIndex: 10,
        padding: `calc(${cardPadding}/2)`,
        cursor: "pointer",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        "p": {
            color: "#059212",
        },
        "p:hover": {
            color: "red"
        }
    }
})
