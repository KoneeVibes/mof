import React, { useEffect, useState } from 'react';
import { Dashboard } from "../dashboard";
import { ChartsRowWrapper, MetricsAreaWrapper, NewProjectCardWrapper } from "./styled";
import { Row } from '../../components/flex/styled';
import { BarChart } from '../../components/barchart/index';
import { PieChart } from '../../components/doughnut/index';
import { LineGraph } from '../../components/graph/index';
import { H1, H2 } from '../../components/typography/styled';
import Cookies from 'universal-cookie';
import { BaseButton } from '../../components/buttons/styled';
import { useNavigate } from 'react-router-dom';
import { getDashboardMetrics } from "../../util/apis/getDashboardMetrics";
import { shuffleArray } from '../../config/shuffleArray';

export const MetricsArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;
    let orgId;

    if (!cookie.USER.roles.includes("SuperAdmin")) {
        orgId = cookie.USER.organizationId;
    }

    const navigate = useNavigate();
    const [dashboardOverview, setDashboardOverview] = useState();

    useEffect(() => {
        getDashboardMetrics(token, orgId)
            .then((data) => {
                setDashboardOverview(data);
            })
            .catch((err) => {
                // should probably deal with error better here
                console.log(err);
            })
    }, [orgId, token]);

    return (
        <Dashboard>
            <MetricsAreaWrapper>
                <H1>DASHBOARD</H1>
                <ChartsRowWrapper>
                    {cookie.USER.roles.includes("SubAdmin") && (
                        <NewProjectCardWrapper>
                            <H2>New Project</H2>
                            <br />
                            <BaseButton
                                width={"-webkit-fill-available"}
                                onClick={() => navigate("/registration/project")}
                            >
                                Add new project
                            </BaseButton>
                        </NewProjectCardWrapper>
                    )}
                    <PieChart
                        title={"Projects Metrics"}
                        values={[dashboardOverview?.projectsMetrics.completed, dashboardOverview?.projectsMetrics.uncompleted]}
                        label={"% of Completion"}
                        labels={['Completed', 'Not Completed']}
                        maxHeight={"400px"}
                        bgColor={['#059212', '#E9ECF1']}
                        borderColor={['#059212', '#E9ECF1']}
                    />
                    <BarChart
                        axis={"y"}
                        title={"Currency Metrics"}
                        labels={dashboardOverview?.fundingsMetrics?.map(funding => funding.currencyName)}
                        datasets={dashboardOverview?.fundingsMetrics ? [
                            {
                                label: "Expended",
                                data: dashboardOverview.fundingsMetrics.map(funding => funding.totalUsed),
                                backgroundColor: "#059212"
                            },
                            {
                                label: "Total",
                                data: dashboardOverview.fundingsMetrics.map(funding => funding.totalFunding),
                                backgroundColor: "#E9ECF1"
                            }
                        ] : []}
                        barThickness={10}
                    />
                </ChartsRowWrapper>
                <Row>
                    <BarChart
                        axis={"x"}
                        title={"Allocation Metrics"}
                        labels={
                            dashboardOverview?.orgsAllocationMetrics
                                ?.filter(metric => metric.totalAllocations.some(allocation => allocation.amount > 0)) // Prioritize non-zero allocations
                                ?.concat(shuffleArray(dashboardOverview?.orgsAllocationMetrics
                                    ?.filter(metric => !metric.totalAllocations.some(allocation => allocation.amount > 0)))) // Add randomized zero allocations if needed
                                ?.slice(0, 5) // Limit to 5 items
                                ?.map(metric => metric.organizationName) // Extract labels
                        }
                        datasets={
                            (() => {
                                // Get unique currency names from all totalAllocations
                                const limitedMetrics = dashboardOverview?.orgsAllocationMetrics
                                    ?.filter(metric => metric.totalAllocations.some(allocation => allocation.amount > 0)) // Prioritize non-zero allocations
                                    ?.concat(shuffleArray(dashboardOverview?.orgsAllocationMetrics
                                        ?.filter(metric => !metric.totalAllocations.some(allocation => allocation.amount > 0)))) // Add randomized zero allocations if needed
                                    ?.slice(0, 5); // Limit to 5 items

                                const currencies = Array.from(new Set(
                                    limitedMetrics?.flatMap(metric =>
                                        metric.totalAllocations.map(allocation => allocation.currencyName)
                                    )
                                ));

                                // Define colors for each currency
                                const colors = ["#059212", "#E9ECF1", "#FFA500", "#0000FF", "#FF0000"];

                                return currencies.map((currency, index) => ({
                                    label: currency,
                                    data: limitedMetrics?.map(org => {
                                        const allocation = org.totalAllocations.find(a => a.currencyName === currency);
                                        return allocation ? allocation.amount : 0;
                                    }),
                                    backgroundColor: colors[index % colors.length]
                                }));
                            })()
                        }
                    />

                </Row>
                <Row>
                    <LineGraph
                        title={"Disbursement Request Metrics"}
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
