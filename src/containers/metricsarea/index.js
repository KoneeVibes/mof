import React, { useEffect, useState } from 'react';
import { Dashboard } from "../dashboard";
import { ChartsRowWrapper, MetricsAreaWrapper } from "./styled";
import { Row } from '../../components/flex/styled';
import { BarChart } from '../../components/barchart/index';
import { PieChart } from '../../components/doughnut/index';
import { LineGraph } from '../../components/graph/index';
import { H1 } from '../../components/typography/styled';
import Cookies from 'universal-cookie';
import { getDashboardMetrics } from "../../util/apis/getDashboardMetrics";
import { SelectFieldWrapper } from '../../components/formfields/select/styled';

export const MetricsArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;
    const orgTypes = ["Ministry", "Parastatal", "Agency"];
    const [selectedOrg, setSelectedOrg] = useState(orgTypes[0]);
    let orgId = cookie.USER.role === "SuperAdmin" ? "" : cookie.USER.organizationId;

    const [dashboardOverview, setDashboardOverview] = useState(null);

    const onSelectofOrgType = (e) => {
        const { value } = e.target;
        setSelectedOrg(value);
    }

    useEffect(() => {
        getDashboardMetrics(token, orgId)
            .then((data) => {
                setDashboardOverview(data);
            })
            .catch((err) => {
                console.error('Failed to fetch dashboard metrics:', err);
            })
    }, [orgId, token]);

    return (
        <Dashboard>
            <MetricsAreaWrapper>
                <H1>DASHBOARD</H1>
                <ChartsRowWrapper>
                    <PieChart
                        title={"Project Metrics"}
                        values={[dashboardOverview?.projectsMetrics.completed, dashboardOverview?.projectsMetrics.uncompleted]}
                        label={"% of Completion"}
                        labels={['Completed', 'Not Completed']}
                        maxHeight={"400px"}
                        bgColor={['#059212', '#E9ECF1']}
                        borderColor={['#059212', '#E9ECF1']}
                    />
                    <BarChart
                        axis={"y"}
                        title={"Funding Metrics"}
                        labels={dashboardOverview?.fundingsMetrics?.map(funding => funding.currencyName)}
                        datasets={dashboardOverview?.fundingsMetrics ? [
                            {
                                label: "Expended Fund",
                                data: dashboardOverview.fundingsMetrics.map(funding => funding.totalUsed),
                                backgroundColor: "#059212"
                            },
                            {
                                label: "Total Fund",
                                data: dashboardOverview.fundingsMetrics.map(funding => funding.totalFunding),
                                backgroundColor: "#E9ECF1"
                            }
                        ] : []}
                        barThickness={10}
                    />
                </ChartsRowWrapper>
                <Row>
                    {(cookie?.USER?.role === "SuperAdmin") ? (
                        <React.Fragment>
                            <SelectFieldWrapper
                                name="orgType"
                                value={selectedOrg}
                                onChange={onSelectofOrgType}
                                style={{ position: "absolute", width: "auto" }}
                            >
                                {orgTypes.map((orgType, key) => (
                                    <option key={key} value={orgType}>
                                        {orgType}
                                    </option>
                                ))}
                            </SelectFieldWrapper>
                            <LineGraph
                                title={"Allocation Per Organization"}
                                // filter by the selected OrgType before mapping
                                labels={dashboardOverview?.orgsAllocationMetrics?.filter((metric) => metric.organizationType === selectedOrg).map((allocationMetric) => allocationMetric.organizationName) || []}
                                datasets={(() => {
                                    const currencyNames = [...new Set(
                                        dashboardOverview?.orgsAllocationMetrics?.flatMap(organization =>
                                            organization.totalAllocations.map(allocation => allocation.currencyName)
                                        ) || []
                                    )];
                                    const colors = ["#059212", "#E9ECF1", "#FFA500", "#0000FF", "#FF0000"];
                                    return currencyNames.map((currencyName, index) => {
                                        return {
                                            label: currencyName,
                                            // filter by the selected OrgType before mapping
                                            data: dashboardOverview?.orgsAllocationMetrics.filter((organization) => organization.organizationType === selectedOrg).map((allocationMetric) => {
                                                const totalAllocation = allocationMetric.totalAllocations.find((totalAllocations) => totalAllocations.currencyName === currencyName);
                                                return totalAllocation ? totalAllocation.amountAllocated : 0;
                                            }),
                                            borderColor: colors[index % colors.length],
                                            backgroundColor: colors[index % colors.length],
                                        };
                                    });
                                })()}
                            />
                        </React.Fragment>
                    ) : (
                        <LineGraph
                            title={"Allocation Per Project"}
                            labels={dashboardOverview?.projectsAllocationMetrics?.map(project => project.projectTitle) || []}
                            datasets={(() => {
                                const currencyNames = [...new Set(
                                    dashboardOverview?.projectsAllocationMetrics?.flatMap(project =>
                                        project.totalAllocations.map(allocation => allocation.currencyName)
                                    ) || []
                                )];
                                const colors = ["#059212", "#E9ECF1", "#FFA500", "#0000FF", "#FF0000"];
                                return currencyNames.map((currencyName, index) => {
                                    return {
                                        label: currencyName,
                                        data: dashboardOverview?.projectsAllocationMetrics.map((project) => {
                                            const totalAllocation = project.totalAllocations.find((totalAllocations) => totalAllocations.currencyName === currencyName);
                                            return totalAllocation ? totalAllocation.amountAllocated : 0;
                                        }),
                                        borderColor: colors[index % colors.length],
                                        backgroundColor: colors[index % colors.length],
                                    }
                                })
                            })()}
                        />
                    )}
                </Row>
                <Row>
                    {(cookie?.USER?.role === "SuperAdmin") ? (
                        <LineGraph
                            title={"Disbursements Per Organization"}
                            // filter by the selected OrgType before mapping
                            labels={dashboardOverview?.orgsDisbursementMetrics?.filter((metric) => metric.organizationType === selectedOrg).map((disbursementMetric) => disbursementMetric.organizationName) || []}
                            datasets={(() => {
                                const currencyNames = [...new Set(
                                    dashboardOverview?.orgsDisbursementMetrics?.flatMap(organization =>
                                        organization.disbursements.map(disbursement => disbursement.currencyName)
                                    ) || []
                                )];
                                const colors = ["#059212", "#E9ECF1", "#FFA500", "#0000FF", "#FF0000"];
                                return currencyNames.map((currencyName, index) => {
                                    return {
                                        label: currencyName,
                                        // filter by the selected OrgType before mapping
                                        data: dashboardOverview?.orgsDisbursementMetrics.filter((organization) => organization.organizationType === selectedOrg).map((disbursementMetric) => {
                                            const disbursement = disbursementMetric.disbursements.find((disbursement) => disbursement.currencyName === currencyName);
                                            return disbursement.amount;
                                        }),
                                        borderColor: colors[index % colors.length],
                                        backgroundColor: colors[index % colors.length],
                                    };
                                });
                            })()}
                        />
                    ) : (
                        <LineGraph
                            title={"Disbursements Per Project"}
                            labels={dashboardOverview?.projectDisbursementMetrics?.map((project) => project.projectTitle) || []}
                            datasets={(() => {
                                const currencyNames = [...new Set(
                                    dashboardOverview?.projectDisbursementMetrics?.flatMap(project =>
                                        project.disbursements.map(disbursement => disbursement.currencyName)
                                    ) || []
                                )];
                                const colors = ["#059212", "#E9ECF1", "#FFA500", "#0000FF", "#FF0000"];
                                return currencyNames.map((currencyName, index) => {
                                    return {
                                        label: currencyName,
                                        data: dashboardOverview?.projectDisbursementMetrics.map((project) => {
                                            const disbursement = project.disbursements.find((disbursement) => disbursement.currencyName === currencyName);
                                            return disbursement.amount;
                                        }),
                                        borderColor: colors[index % colors.length],
                                        backgroundColor: colors[index % colors.length],
                                    };
                                });
                            })()}
                        />
                    )}
                </Row>
            </MetricsAreaWrapper>
        </Dashboard>
    );
}