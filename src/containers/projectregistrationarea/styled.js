import styled from "styled-components";
import { Row } from "../../components/flex/styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled"
import { BaseButton } from "../../components/buttons/styled";

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
    `
})

 export const ProjectRegistrationBaseInput = styled(BaseInputWrapper)(({ cardPadding = "var(--cardPadding)" }) => {
     return {
         width: "-webkit-fill-available",
         padding: `calc(${cardPadding}/2) calc(${cardPadding})`,
     }
 })

 export const ProjectRegistrationBaseInputWrapper =  styled(Row)(({ flexGap = "var(--flexGap)"}) => { 
     return {
         "@media screen and (max-width: 425px)": {
             flexDirection: "column",
             gap: `calc(${flexGap}/2)`,
         },
         "@media screen and (max-width: 1280px)": {
            flexWrap: "wrap",
         }
        
     }
 })

export const ProjectRegistrationBaseButton = styled(BaseButton)(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        width: "fit-content",
        padding: `calc(${cardPadding}/2) calc(${cardPadding})`,
        borderRadius:"25px",
        cursor: 'pointer',
    }
})
