import styled from "styled-components";
import { Column, Row } from "../../components/flex/styled";
import { CardWrapper } from "../../components/card/styled";

export const MetricsAreaWrapper = styled(Column)(() => {
    return `
        h1{
            margin-block: 0;
        }

        .card-component .bar-chart-component,
        .card-component .pie-chart-component,
        .card-component .line-graph-component {
            width: 100% !important;
            height: 100% !important;
        }
    `
})

export const ChartsRowWrapper = styled(Row)(() => {
    return `
        flex-wrap: wrap;
        @media screen and (max-width: 425px){
            flex-direction: column;
        }
    `
})

export const ChartsCardWrapper = styled(CardWrapper)(() => {
    return `
        @media screen and (min-width: 425px){
            min-width: 22rem;
            padding: calc(var(--cardPadding)/2);
        }
    `
})

export const NewProjectCardWrapper = styled(CardWrapper)(() => {
    return `
        padding: var(--cardPadding);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media screen and (min-width: 425px){
            min-width: 22rem;
        }
    `
})
