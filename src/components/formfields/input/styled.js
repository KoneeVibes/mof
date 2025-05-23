import styled from "styled-components";
import { Row } from "../../flex/styled";

export const BaseInputWrapper = styled("input")`
  ${({
  cardPadding = "var(--basic-padding)",
  width,
  border,
  boxshadow,
  borderradius,
  backgroundcolor,
  margininlinestart,
}) => {
    return {
      padding: `calc(${cardPadding}/2.5)`,
      marginInlineStart: margininlinestart || "0",
      border: border || "1px solid var(--border-stroke-color)",
      boxShadow: boxshadow || "1px 1px 1px var(--box-shadow-color)",
      outline: "none",
      fontFamily: "Inter",
      fontSize: "14px",
      fontWeight: 500,
      borderRadius: borderradius || "12px",
      backgroundColor: backgroundcolor || "var(--light-color)",
      "&::placeholder": {
        color: "var(--gray-variant-color)",
        opacity: 1 /* Firefox */,
      },
      "&::-ms-input-placeholder": {
        color: "var(--dark-color)",
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
  ({ cardPadding = "var(--basic-padding)" }) => {
    return `
            padding: calc(${cardPadding} / 2.5);
            background-color: var(--primary-color);
            border: none;
            border-radius: 8px;
        `;
  }
);

export const InputFieldWrapper = styled(Row)(({ width }) => {
  return {
    borderRadius: "49px",
    width: width || "auto",
  };
});
