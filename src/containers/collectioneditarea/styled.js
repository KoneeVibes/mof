import styled from "styled-components";

export const CollectionEditAreaWrapper = styled("div")(() => {
    return {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "stretch",

        "& form": {
            display: "flex",
            flexDirection: "column",
            gap: "var(--flexGap)",
        },

        "& .dotLoader": {
            marginLeft: "auto",
            marginRight: "auto",
        }
    }
})