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
        "form": {
            display: "flex",
            flexDirection: "column",
            gap: "var(--flexGap)",
        }
    },
}))

export const AuthRow = styled(Row)(() => {
    return {
        height: "inherit",
        gap: 0,
    }
}) 