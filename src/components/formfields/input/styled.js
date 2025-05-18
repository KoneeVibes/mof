import styled from "styled-components";
import { Row } from "../../flex/styled";

export const BaseInputWrapper = styled("input")`
  ${({
    cardPadding = "var(--cardPadding)",
    width,
    border,
    borderradius,
    backgroundcolor,
    margininlinestart,
  }) => {
    return {
      padding: `calc(${cardPadding}/2.5)`,
      marginInlineStart: margininlinestart || "0",
      border: border || "none",
      boxShadow: "1px 1px 1px #3232470D",
      outline: "none",
      fontFamily: "Avenir-Next",
      fontSize: "14px",
      fontWeight: "500",
      borderRadius: borderradius || "12px",
      backgroundColor: backgroundcolor || "#FFFFFF",
      "&::placeholder": {
        color: "##808080",
        opacity: 1 /* Firefox */,
      },
      "&::-ms-input-placeholder": {
        color: "#000000",
      },
      "@supports (width: -webkit-fill-available)": {
        width: width || "-webkit-fill-available",
      },
      "@supports (width: -moz-available)": {
        width: width || "-moz-available",
      },
    };
  }}
`;

export const SearchButtonWrapper = styled("button")(
  ({ cardPadding = "var(--cardPadding)" }) => {
    return `
            padding: calc(${cardPadding} / 2.5);
            background-color: #059212;
            border: none;
            border-radius: 8px;
        `;
  }
);

export const InputFieldWrapper = styled(Row)(({ width }) => {
  return {
    // border: "1px solid #213F7D",
    borderRadius: "49px",
    width: width || "auto",
  };
});
