import styled from "styled-components";
import { Row } from "../../components/flex/styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { BaseButton } from "../../components/buttons/styled";

export const ProjectRegistrationAreaWrapper = styled.div(() => {
  return `
        display: flex;
        flex-direction: column;
        justify-content: center;

        form{
            display: flex;
            flex-direction: column;
            gap: var(--flexGap);
            overflow: hidden;
        }

        .dotLoader{
            margin-left: auto;
            margin-right: auto;
        }

        @supports (width: -webkit-fill-available) {
          input{
            width: -webkit-fill-available !important;
          }
        }

        @supports (width: -moz-available) {
          input{
            width: -moz-available;
          }
        }
    `;
});

export const ProjectRegistrationBaseInput = styled(BaseInputWrapper)(
  () => {
    return {
      width: "-webkit-fill-available",
    };
  }
);

export const ProjectRegistrationBaseInputWrapper = styled(Row)(
  ({ flexGap = "var(--flexGap)" }) => {
    return {
      flexWrap: "wrap",
      overflow: "hidden",
      "& .row-date": {
        alignItems: "center",
      },
      "@media screen and (max-width: 425px)": {
        gap: `calc(${flexGap}/2)`,
      },
    };
  }
);

export const ProjectRegistrationBaseButton = styled(BaseButton)(
  ({ cardPadding = "var(--cardPadding)" }) => {
    return {
      width: "fit-content",
      padding: `calc(${cardPadding}/2) calc(${cardPadding})`,
      borderRadius: "25px",
      cursor: "pointer",
    };
  }
);
