import styled from "styled-components";

export const AuthWrapper = styled("div")(() => ({
    ".auth-img-div": {
        flex: 1,
        "svg": {
            objectFit: "cover",
            width: "100%",
            height: "auto",
        }
    },
    ".auth-form-div": {
        flex: 1
    }
}))