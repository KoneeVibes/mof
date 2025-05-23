import styled from "styled-components";

export const BaseButton = styled.button(
    ({ width }) => {
        return {
            //styles for button should begin below this line.
            textAlign: "center",
            backgroundColor: "var(--primary-color)",
            border: "none",
            color: "var(--light-color)",
            borderRadius: "10px",
            width: width || "100%",
            padding: "calc(var(--basic-padding)/2) calc(var(--basic-padding))",
            textTransform: "capitalize",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer"
        }
    }
)