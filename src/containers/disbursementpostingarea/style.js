import styled from "styled-components";
import { Row } from "../../components/flex/styled";
import { BaseButton } from "../../components/buttons/styled";

export const DisbursementRequestAreaWrapper = styled.div(() => {
    return `
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;

        form{
            display: flex;
            flex-direction: column;
            gap: var(--flex-gap);
        }

        .dotLoader{
            margin-left: auto;
            margin-right: auto;
        }
    `
})

export const DisbursementRequestBaseInputWrapper = styled(Row)(({ flexGap = "var(--flex-gap)" }) => {
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

export const DisbursementRequestBaseButton = styled(BaseButton)(({ cardPadding = "var(--basic-padding)" }) => {
    return {
        width: "fit-content",
        padding: `calc(${cardPadding}/2) calc(${cardPadding})`,
        borderRadius: "25px",
        cursor: 'pointer',
    }
})
