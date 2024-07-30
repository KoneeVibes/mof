import styled from "styled-components";
import { Column, Row } from "../../components/flex/styled";
import { CardWrapper } from "../../components/card/styled";

export const DataOverviewAreaWrapper = styled(Column)(() => {
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

export const DataOverviewTableWrapper = styled.div(({ cardPadding = "var(--cardPadding)" }) => {
    return {
        overflow: "auto",
        "table": {
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            borderCollapse: "collapse",
            cursor: "pointer",
        },
        "th": {
            textAlign: "left",
            textTransform: "uppercase",
            padding: cardPadding,
            borderBottom: "1px solid rgba(33, 63, 125, 0.10)",
            minWidth: "150px",
        },
        "td": {
            textAlign: "left",
            border: "1px solid rgba(33, 63, 125, 0.10)",
            padding: cardPadding,
            minWidth: "150px",
        },
        "tbody tr td:nth-child(1)": {
            textAlign: "left",
        },
    }
})
