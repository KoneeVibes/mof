import styled from "styled-components";
import { Row } from "../../components/flex/styled";
import { CardWrapper } from "../../components/card/styled";

export const MetricsAreaWrapper = styled.div(() => {
    return`
        .card-component .bar-chart-component,
        .card-component .pie-chart-component,
        .card-component .line-graph-component {
            width: 100% !important;
            height: 100% !important;
        }
    `
})

export const ChartsRowWrapper = styled(Row)(() => {
    return`
        flex-wrap: wrap;
        @media screen and (max-width: 425px){
            flex-direction: column;
        }
    `
})

export const ChartsCardWrapper = styled(CardWrapper)(() => {
    return `
        @media screen and (min-width: 425px){
            min-width: 18.75rem;
        }
    `
})