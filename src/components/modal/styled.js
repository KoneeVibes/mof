import styled from "styled-components";

export const BaseModalWrapper = styled("div")(({ open, height, width }) => {
    return {
        display: open ? "block" : "none",
        zIndex: 2,
        overflowY: "auto",
        height: height || "50%",
        width: width || "50%",
        pointerEvents: "auto",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#FFFFFF",
        borderRadius: "8px",
        padding: "var(--cardPadding)",
        boxShadow: "0px 4px 4px 4px rgba(0, 0, 0, 0.25)",
        "& h2": {
            textAlign: "center",
        },
        "& p": {
            textAlign: "center",
        },
        "& svg": {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            "@media screen and (max-width: 768px)": {
                height: "auto",
            }
        },
        "& button": {
            marginBlockStart: "2rem"
        }
    }
})
