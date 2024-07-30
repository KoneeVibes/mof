import Cookies from "universal-cookie";
import { Table } from "../../components/table";
import { Layout } from "../../containers/layout/index";
import { AdminOverviewAreaTable, AdminOverviewAreaWrapper } from "./styled";
import { getDashboardMetrics } from "../../util/apis/getDashboardMetrics";
import { useEffect, useState } from "react";
import { Jumbotron } from "../../components/jumbotron";
import { H1, P } from "../../components/typography/styled";

export const AdminOverviewArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;
    const categories = [
        "Project Title",
        "MDA",
        "Allocation",
        "Funding Balance",
        "Status"
    ];
    let orgId = cookie.USER.role === "SuperAdmin" ? "" : cookie.USER.organizationId;

    const [dashboardOverview, setDashboardOverview] = useState(null);
    const [projects, setProjects] = useState([]);

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

    if (!cookie.USER.role === "SuperAdmin") {
        return (
            <Layout>
                <AdminOverviewAreaWrapper>
                    <Jumbotron />
                    <H1>Unauthorized</H1>
                    <P>You are not authorized to view this page</P>
                </AdminOverviewAreaWrapper>
            </Layout>
        );
    }

    return (
        <Layout>
            <AdminOverviewAreaWrapper>
                <Jumbotron entity={cookie?.USER?.organization} />
                <AdminOverviewAreaTable>
                    <Table
                        location={"dataOverviewArea"}
                        categories={categories}
                        rowItems={projects}
                        uniqueCurrencies={[...new Set(
                            dashboardOverview?.projectsAllocationMetrics?.flatMap(project =>
                                project.totalAllocations.map(allocation => allocation.currencyName)
                            ) || []
                        )]}
                        role={cookie.USER.role}
                        onSelectOption={(_, __, e) => e.preventDefault()}
                    />
                </AdminOverviewAreaTable>
            </AdminOverviewAreaWrapper>
        </Layout>
    )
}