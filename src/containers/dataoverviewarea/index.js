import React, { useEffect, useState } from 'react';
import { ChartsRowWrapper, DataOverviewAreaWrapper, DataOverviewTableWrapper } from "./styled";
import { Row } from '../../components/flex/styled';
import { BarChart } from '../../components/barchart/index';
import { PieChart } from '../../components/doughnut/index';
import { LineGraph } from '../../components/graph/index';
import Cookies from 'universal-cookie';
import { getDashboardMetrics } from "../../util/apis/getDashboardMetrics";
import { SelectFieldWrapper } from '../../components/formfields/select/styled';
import { Table } from '../../components/table';
import { getExcelSheet } from '../../util/apis/getExcelSheet';
import { getFilteredDashboard } from '../../util/apis/getFilteredDashboard';
import { getAllOrganizations } from '../../util/apis/getAllOrganizations';
import { flattenOrganizations } from '../../config/flattenOrganizations';

export const status = ["Ongoing", "Closed", "Terminated"];
export const DataOverviewArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;
    const orgTypes = ["Ministry", "Department", "Agency", "State"];
    const categories = [
        "Project Title",
        ...(cookie.USER.role === "SuperAdmin" ? ["MDA"] : []),
        "Allocation",
        "Disbursement",
        "Funding Balance",
        "Status"
    ];
    let orgId = cookie.USER.role === "SuperAdmin" ? "" : cookie.USER.organizationId

    const [selectedOrg, setSelectedOrg] = useState(orgTypes[0]);
    const [dashboardOverview, setDashboardOverview] = useState(null);
    const [filteredDashboard, setFilteredDashboard] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const [formDetails, setFormDetails] = useState({
        orgType: "",
        status: "",
    });

    const onSelectofOrgType = (e) => {
        const { value } = e.target;
        setSelectedOrg(value);
    }

    const handleFilterValueChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const exportToExcel = async (e) => {
        e.preventDefault();
        // Loader starts
        try {
            const blob = await getExcelSheet(token, "dashboard");
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            // may have to come back to reset this filename
            a.download = 'export.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // Clean up
            // Loader stops
            console.log("Successfully exported to an xlsx file");
        } catch (error) {
            // Loader stops
            console.error("Failed to export:", error);
        }
    };

    useEffect(() => {
        if (token) {
            getAllOrganizations(token).then((listOfOrganizations) => {
                const collapsedList = flattenOrganizations(listOfOrganizations);
                setOrganizations(collapsedList.map((organizationInfo) => organizationInfo.name));
            }).catch((error) => {
                console.error("Failed to fetch organizations:", error);
            });
        }
    }, [token]);

    useEffect(() => {
        getDashboardMetrics(token, orgId)
            .then((data) => {
                setDashboardOverview(data);
                setProjects(data.projectsAllocationMetrics);
            })
            .catch((err) => {
                console.error('Failed to fetch dashboard metrics:', err);
            })
    }, [orgId, token]);

    useEffect(() => {
        getFilteredDashboard(token, formDetails)
            .then((data) => {
                setFilteredDashboard(data);
                setFilteredProjects(data.projectsAllocationMetrics);
            })
            .catch((err) => {
                console.error('Failed to fetch dashboard metrics:', err);
            })
    }, [orgId, token, formDetails]);

    return (
        <DataOverviewAreaWrapper>
            <ChartsRowWrapper>
                <PieChart
                    title={"Project Metrics"}
                    values={[dashboardOverview?.projectsMetrics.completed, dashboardOverview?.projectsMetrics.ongoing, dashboardOverview?.projectsMetrics.terminated]}
                    label={"% of Completion"}
                    labels={['Completed', 'Ongoing', 'Terminated']}
                    maxHeight={"400px"}
                    bgColor={['#059212', '#E9ECF1', '#FF0000']}
                    borderColor={['#059212', '#E9ECF1', '#FF0000']}
                />
                <BarChart
                    axis={"y"}
                    title={"Funding Metrics"}
                    labels={dashboardOverview?.fundingsMetrics?.map(funding => funding.currencyName)}
                    datasets={dashboardOverview?.fundingsMetrics ? [
                        {
                            label: "Expended",
                            data: dashboardOverview.fundingsMetrics.map(funding => funding.totalUsed),
                            backgroundColor: "#059212"
                        },
                        {
                            label: "Balance",
                            data: dashboardOverview.fundingsMetrics.map(funding => funding.totalFunding - funding.totalUsed),
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
            <DataOverviewTableWrapper>
                <Table
                    location={"dataOverviewArea"}
                    categories={categories}
                    rowItems={filteredProjects}
                    uniqueCurrencies={[...new Set(
                        filteredDashboard?.projectsAllocationMetrics?.flatMap(project =>
                            project.totalAllocations.map(allocation => allocation.currencyName)
                        ) || []
                    )]}
                    role={cookie.USER.role}
                    onSelectOption={(_, __, e) => e.preventDefault()}
                    exportToExcel={exportToExcel}
                    orgNames={organizations}
                    status={status}
                    handleFilterValueChange={handleFilterValueChange}
                />
            </DataOverviewTableWrapper>
        </DataOverviewAreaWrapper>
    );
}