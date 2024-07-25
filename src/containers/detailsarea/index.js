import { useNavigate, useParams } from "react-router-dom";
import { Dashboard } from "../dashboard";
import { Row } from "../../components/flex/styled";
import { ProjectDetailCardWrapper, ProjectDetailsAreaWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron";
import { InitiativeIcon, FundingSourceIcon } from "../../assets";
import { Table } from "../../components/table";
import { ProjectDetailBaseButton } from "./styled";
import { H1, H2, H3, Li, P } from "../../components/typography/styled";
import { useEffect, useState } from "react";
import { getProject } from "../../util/apis/getProject";
import Cookies from "universal-cookie";
import { BaseButton } from "../../components/buttons/styled";
import { NewProjectCardWrapper } from "../metricsarea/styled";
import { getDisbursementRequests } from "../../util/apis/getDisbursementRequests";
import { BarChart } from "../../components/barchart";

export const ProjectDetailsArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;
    // eslint-disable-next-line no-unused-vars
    const [columns, setColumns] = useState(["Date Requested", "Requester", "Purpose", "Amount", "Status"]);
    // eslint-disable-next-line no-unused-vars
    const [currencies, setCurrencies] = useState([]);
    const [requests, setRequests] = useState([]);

    const navigate = useNavigate();
    const { entity, projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProject(token, projectId)
            .then((project) => {
                setProject(project);
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
    }, [projectId, token]);

    useEffect(() => {
        getDisbursementRequests(token, projectId).then((requests) => setRequests(requests))
    })

    if (loading) {
        return (
            <Dashboard>
                <ProjectDetailsAreaWrapper>
                    <Jumbotron />
                    <H1>Loading...</H1>
                </ProjectDetailsAreaWrapper>
            </Dashboard>
        );
    }

    if (!project) {
        return (
            <Dashboard>
                <ProjectDetailsAreaWrapper>
                    <Jumbotron />
                    <H1>Project not found</H1>
                    <P>We couldn't find the project you were looking for. Please check the URL or try again later.</P>
                </ProjectDetailsAreaWrapper>
            </Dashboard>
        );
    }

    return (
        <Dashboard>
            <ProjectDetailsAreaWrapper>
                <Jumbotron />
                <Row tocolumn={1}>
                    {cookie.USER.roles.includes("SubAdmin") && (
                        <NewProjectCardWrapper>
                            <H2>New User</H2>
                            <br />
                            <BaseButton
                                width={"-webkit-fill-available"}
                                onClick={() => navigate(`/registration/${projectId}/user`)}
                            >
                                Add new user to Project
                            </BaseButton>
                        </NewProjectCardWrapper>
                    )}
                    <ProjectDetailCardWrapper>
                        <InitiativeIcon />
                        <H3>{project?.projectTitle}</H3>
                        <P>{project?.description}</P>
                        <P>
                            <span>MDA:</span> {project?.organization}
                        </P>
                    </ProjectDetailCardWrapper>
                </Row>
                <Row tocolumn={1}>
                    <ProjectDetailCardWrapper>
                        <FundingSourceIcon />
                        <H3>Funding Source and Amount</H3>
                        <ul>
                            {project?.fundingSources?.map((source, key) => (
                                <Li key={key}>{source.funder}: <span>{source.currencySymbol}{source.amount}</span></Li>
                            ))}
                        </ul>
                    </ProjectDetailCardWrapper>
                    <BarChart
                        axis={"y"}
                        title={"Allocated Currencies Metrics"}
                        barThickness={10}
                        labels={Array.from(new Set(project?.allocations?.map(allocation => allocation.currencyName)))}
                        datasets={(() => {
                            const allocations = project?.allocations || [];
                            // Create a set of unique currency names
                            const currencySet = new Set(allocations.map(allocation => allocation.currencyName));
                            const uniqueCurrencies = Array.from(currencySet);
                            const datasets = [
                                {
                                    label: "Amount Disbursed",
                                    data: uniqueCurrencies.map(currency =>
                                        allocations.find(allocation => allocation.currencyName === currency)?.amountDisbursed || 0
                                    ),
                                    backgroundColor: "#059212"
                                },
                                {
                                    label: "Balance",
                                    data: uniqueCurrencies.map(currency => {
                                        const allocation = allocations.find(allocation => allocation.currencyName === currency);
                                        return allocation ? (allocation.amountAllocated - allocation.amountDisbursed) : 0;
                                    }),
                                    backgroundColor: "#E9ECF1"
                                }
                            ];
                            return datasets;
                        })()}
                    />
                </Row>
                <H2>Disbursement Requests</H2>
                <div style={{ overflow: "auto" }}>
                    <Table
                        location={"detailsArea"}
                        columnTitles={columns}
                        rowItems={requests}
                        uniqueCurrencies={currencies}
                        onSelectOption={(x, y, event) => event.preventDefault()}
                    />
                </div>
                {!cookie.USER.roles.includes("SuperAdmin") && (
                    <ProjectDetailBaseButton
                        onClick={() => navigate(`/${entity}/${projectId}/request`)}
                    >
                        Make a Request
                    </ProjectDetailBaseButton>
                )}
            </ProjectDetailsAreaWrapper>
        </Dashboard>
    );
};
