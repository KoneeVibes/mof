import styled from "styled-components";

export const BaseButton = styled.button(
    ({direction}) => {
        return{
            //styles for button should begin below this line.
            textAlign: "center",
            backgroundColor: "#059212",
            border: "none",
            color: "white",
            borderRadius: "7px",
            width: "100%",
            paddingTop: "1.5rem",
            paddingBottom: "1.5rem",
            textTransform: "uppercase",
            fontSize: "1rem",
        }
    }
)