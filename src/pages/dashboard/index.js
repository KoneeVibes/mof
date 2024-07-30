import { H1 } from "../../components/typography/styled";
import { Layout } from "../../containers/layout";
import { DataOverviewArea } from "../../containers/dataoverviewarea";
import { DashboardWrapper } from "./styled";

export const Dashboard = () => {
    return (
        <Layout>
            <DashboardWrapper>
                <H1>DASHBOARD</H1>
                <DataOverviewArea />
            </DashboardWrapper>
        </Layout>
    )
}