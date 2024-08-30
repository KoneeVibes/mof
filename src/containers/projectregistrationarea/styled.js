import styled from "styled-components";
import { Row } from "../../components/flex/styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { BaseButton } from "../../components/buttons/styled";
import { Colors } from "chart.js";

export const ProjectRegistrationAreaWrapper = styled.div(() => {
  return `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flexStart;

        form{
            display: flex;
            flex-direction: column;
            gap: var(--flexGap);
        }

        .dotLoader{
            margin-left: auto;
            margin-right: auto;
        }
             
                      
    `;
});

export const ProjectRegistrationBaseInput = styled(BaseInputWrapper)(
  ({ cardPadding = "var(--cardPadding)" }) => {
    return {
      width: "-webkit-fill-available",
      padding: `calc(${cardPadding}/2) calc(${cardPadding})`,
      boxSizing: "border-box",
      display: "flex",
      flexWrap: "wrap",
    };
  }
);

export const ProjectRegistrationBaseInputWrapper = styled(Row)(
  ({ flexGap = "var(--flexGap)" }) => {
    return {
      flexWrap: "wrap",
      "@media screen and (max-width: 425px)": {
        display: "flex",
        flexDirection: "column",
        gap: `calc(${flexGap}/2)`,
        
      },
      "@media screen and (max-width: 1280px)": {
        flexDirection: "column",
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
