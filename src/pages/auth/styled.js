import styled from "styled-components";
import { Row } from "../../components/flex";

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
        flex: 1
    },
}))

export const AuthRow = styled(Row)(() => {
    return {
        height: "inherit"
    }
}) 