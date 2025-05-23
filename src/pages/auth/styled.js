import styled from "styled-components";
import { Row } from "../../components/flex/styled";

export const AuthWrapper = styled(Row)(() => ({
    height: "100vh",
    overflow: "hidden",
    gap: 0,
    "& .auth-thumbnail-area": {
        flex: 1,
        backgroundColor: "var(--off-white-color)",
        objectFit: "cover",
        overflow: "hidden",
        padding: "calc(var(--basic-padding) * 1.5)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "calc(var(--flex-gap) * 1)",
        "& .logo": {
            width: "12rem",
            height: "3rem",
        },
        "& .text-area": {
            "h1": {
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "24px",
                color: "var(--heading-text-color)",
                marginBlock: "0 calc(var(--basic-margin) * 0.25)",
            },
            "p": {
                fontWeight: 500,
                color: "var(--body-text-color)",
                marginBlock: 0,
            }
        },
        "& .thumbnail-area": {
            "& img": {
                position: "absolute",
                left: "calc(var(--basic-padding) * 1.5)",
                right: 0,
                top: "50%",
                bottom: 0,
                width: "100%",
                height: "-webkit-fill-available",
            }
        }
    },
    "& .auth-form-area": {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        padding: "calc(var(--basic-padding) * 1.5)",
        "& .auth-form": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "75%",
            overflow: "hidden",
            padding: "calc(var(--basic-padding))",
            boxShadow: "0px 4px 20px var(--box-shadow-color)",
            borderRadius: "16px",
            zIndex: 1,
            "& form": {
                display: "flex",
                flexDirection: "column",
                gap: "calc(var(--flex-gap)/2)",
                overflow: "hidden"
            },
            "& fieldset": {
                border: "none",
                marginInline: 0,
                paddingBlock: 0,
                paddingInline: 0,
                minInlineSize: 0,
            },
            "& .form-field": {
                display: "flex",
                width: "-webkit-fill-available",
                backgroundColor: "var(--light-color)",
                alignItems: "center",
                borderRadius: "12px",
                padding: "calc(var(--basic-padding) * 0.03125) calc(var(--basic-padding) * 0.625)",
                border: "1.5px solid var(--border-stroke-color)",
                overflow: "hidden",
                marginBlockStart: "calc(var(--basic-margin) * 0.25)",
            },
            "& legend": {
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "24px",
                color: "var(--heading-text-color)",
                overflow: "hidden",
                textOverflow: "ellipsis",
            },
            "& label": {
                fontWeight: 500,
                color: "var(--form-label-color)",
            },
        },
    },
    "& .showPassword": {
        display: "flex",
        alignItems: "center",
        position: 'absolute',
        right: '10px',
        top: '70%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        color: "var(--gray-variant-color)",
    },
    "& .forgotPassword": {
        fontWeight: 600,
        fontSize: "12px",
        color: "var(--primary-color)",
        textAlign: "right",
        cursor: "pointer",
    },
    "& .dotLoader": {
        marginLeft: "auto",
        marginRight: "auto",
    },
    "@media screen and (max-width: 1024px)": {
        "& .auth-thumbnail-area": {
            display: "none",
        },
        "& .auth-form-area": {
            "& .auth-form": {
                width: "100%",
                boxShadow: "none",
                borderRadius: "unset",
                zIndex: "unset",
            }
        },
    },
}))
