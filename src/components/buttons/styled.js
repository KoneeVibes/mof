import styled from "styled-components";

export const BaseButton = styled.button(
    ({ width }) => {
        return {
            //styles for button should begin below this line.
            textAlign: "center",
            backgroundColor: "#059212",
            border: "none",
            color: "white",
            borderRadius: "7px",
            width: width || "100%",
            padding: "1.5rem",
            textTransform: "uppercase",
            fontSize: "1rem",
            cursor: "pointer",
        }
    }
)