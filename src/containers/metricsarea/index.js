import React from 'react';
import { Dashboard } from "../dashboard";
import { ChartsRowWrapper, MetricsAreaWrapper } from "./styled";
import { Row } from '../../components/flex/styled';
import { BarChart } from '../barchart';
import { PieChart } from '../doughnut';
import { LineGraph } from '../graph';
import { H1 } from '../../components/typography/styled';

export const MetricsArea = () => {
    //The idea is that this component will hold a generic dashboard that can be reused for mof, the ministries or parastatals
    //Depending of say the authorization the endpoint will return data that will populate the dashboard.
    return (
        <Dashboard>
            <MetricsAreaWrapper>
                <H1>DASHBOARD</H1>
                <ChartsRowWrapper>
                    <PieChart
                        values={[80, 20]}
                    />
                    <BarChart
                        axis={"x"}
                        labels={['FMOD', 'FMOH', 'FMIC', 'FMI', 'FMP', 'FMT', 'FME']}
                        values={[20, 40, 70, 45, 80, 16, 33]}
                    />
                    <BarChart
                        axis={"y"}
                        labels={['Naira', 'Dollar', 'Pounds', 'Euro']}
                        values={[20, 40, 70, 45]}
                    />
                </ChartsRowWrapper>
                <br />
                <Row>
                    <LineGraph
                        label1={"Euro"}
                        values1={[90, 20, 45, 60, 76, 23, 56]}
                        label2={"Pounds"}
                        values2={[10, 67, 45, 43, 55, 90, 61]}
                        label3={"Dollars"}
                        values3={[45, 78, 59, 93, 65, 70, 21]}
                    />
                </Row>
            </MetricsAreaWrapper>
        </Dashboard>
    );
}
