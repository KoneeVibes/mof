import styled from "styled-components";
import { Row } from "../../components/flex/styled";

export const AuthWrapper = styled("div")(() => ({
    height: "100vh",
    overflow: "hidden",
    "@media screen and (max-width: 1024px)": {
        height: "auto",
    },
    ".auth-img-div": {
        flex: 1,
        "img": {
            objectFit: "cover",
            width: "100%",
            height: "100%",
        }
    },
    ".auth-form-div": {
        flex: 1,
        padding: "4rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flexStart",
        "form": {
            display: "flex",
            flexDirection: "column",
            gap: "var(--flexGap)",
        },
    },
    "h1": {
        marginBottom: "1rem",
        fontSize: "2rem",
        color: "#059212",
    },
    "P": {
        marginBottom: "2rem",
        color: "#102C57",
        fontWeight: "bold",
    },
    ".showPassword": {
        display: "flex",
        alignItems: "center",
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        color: "#102C57",
    },
    ".forgotPassword": {
        color: "#102C57",
        textDecoration: "none",
        fontWeight: 800,
        fontSize: "12px",
        marginBlock: 0,
        cursor: "pointer",
    },
    ".dotLoader": {
        marginLeft: "auto",
        marginRight: "auto",
    },
}))

export const AuthRow = styled(Row)(() => {
    return {
        height: "inherit",
        gap: 0,
    }
}) 