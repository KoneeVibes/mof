import styled from "styled-components";
import { Row } from "../../components/flex/styled";

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

    `
})