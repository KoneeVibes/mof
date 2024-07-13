import styled from "styled-components";
import { CardWrapper } from "../../components/card/styled";
import { BaseButton } from "../../components/buttons/styled";
import { Row } from "../../components/flex/styled";

export const ProjectDetailsAreaWrapper = styled.div(({ cardPadding = "var(--cardPadding)" }) => {
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
    }
})

export const ProjectDetailCardWrapper = styled(CardWrapper)(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        //Generic styles for the cards come here.
        backgroundColor: "#eeeeee",
        padding: cardPadding,
        textAlign: "justify",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",

        "h1": {
            textDecoration: "underline",
        }
    }
})

export const ProjectDetailBaseButton = styled(BaseButton)(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        width: "fit-content",
        padding: `calc(${cardPadding}/2) calc(${cardPadding})`,
        
    }
})

export const ProjectDetailButtonsWrapper =  styled(Row)(({ flexGap = "var(--flexGap)"}) => { 
    return {
        "@media screen and (max-width: 425px)": {
            flexDirection: "column",
            gap: `calc(${flexGap}/2)`,
        },
        
    }
})