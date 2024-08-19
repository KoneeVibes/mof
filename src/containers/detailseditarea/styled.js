import styled from "styled-components";
import { CardWrapper } from "../../components/card/styled";

export const DetailsEditAreaWrapper = styled(CardWrapper)(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "40vw",
        height: "60vh",
        overflow: "auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transform: "translate(-50%, -50%)",
        padding: `calc(${cardPadding}/1)`,
        cursor: "pointer",
        backgroundColor: "#F0F0F0",
        zIndex: 1,
        "form": {
            display: "flex",
            flexDirection: "column",
            gap: "var(--flexGap)",
        }
    }
})