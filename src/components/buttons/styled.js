import styled from "styled-components";

export const BaseButton = styled.button(
    ({ width }) => {
        return {
            //styles for button should begin below this line.
            textAlign: "center",
            backgroundColor: "#003E06",
            border: "none",
            color: "white",
            borderRadius: "10px",
            width: width || "100%",
            padding: "1.5rem",
            // textTransform: "uppercase",
            fontSize: "1rem",
            fontWeight: "500",
            cursor: "pointer"
        }
    }
)