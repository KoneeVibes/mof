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
import { PieChart } from "../../components/doughnut/index";
import { getDisbursementRequestsPerProject } from "../../util/apis/getDisbursementRequests";

export const ProjectDetailsArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;
    const [columns, setColumns] = useState(["Date Requested", "Requester", "Status"]);
    const [currencies, setCurrencies] = useState([]);
    const [allocationAmounts, setAllocationsAmounts] = useState([]);
    const [requests, setRequests] = useState([]);

    const navigate = useNavigate();
    const { entity, projectId } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getProject(token, projectId)
            .then((project) => {
                const allocations = project.allocations
                // group allocations based on currencyName
                const groupedAllocations = allocations.reduce((acc, allocation) => {
                    const { currencyName } = allocation;
                    if (!acc[currencyName]) {
                        acc[currencyName] = [];
                    }
                    acc[currencyName].push(allocation);
                    return acc;
                }, {});
                // sum allocations based on currencyNames
                const summedAllocations = Object.keys(groupedAllocations).map(currencyName => {
                    const totalAmount = groupedAllocations[currencyName].reduce((sum, allocation) => sum + allocation.amount, 0);
                    return {
                        currencyName,
                        totalAmount
                    };
                });
                setProject(project);
                setAllocationsAmounts(summedAllocations.map(summedAllocation => summedAllocation.totalAmount));
                setCurrencies(Object.keys(groupedAllocations));

                const uniqueCurrencies = [...new Set(Object.keys(groupedAllocations))].map(currency => `Request in ${currency}`);

                setColumns((_) => {
                    const newColumns = ["Date Requested", "Requester", ...uniqueCurrencies, "Status"];
                    return newColumns;
                });
                setLoading(false);
            }).catch(() => {
                setLoading(false);
            });
    }, [projectId, token]);

    useEffect(() => {
        // get disbursements for a project not overall disbursements
        getDisbursementRequestsPerProject(token).then((requests) => setRequests(requests))
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
                    <NewProjectCardWrapper>
                        <H2>New User</H2>
                        <br />
                        <BaseButton
                            width={"-webkit-fill-available"}
                            onClick={() => navigate(`/registration/${projectId}/user`)}
                        >
                            Add new user
                        </BaseButton>
                    </NewProjectCardWrapper>
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
                    <PieChart
                        title={"Allocated Currencies Metrics"}
                        label={"Share of currency allocation"}
                        labels={currencies}
                        values={allocationAmounts}
                        maxHeight={"400px"}
                        // We have to get an api that can return different colors based on
                        // the number of labels available
                        bgColor={["Green", "#E9ECF1", "Blue", "Pink", "yellow"]}
                        borderColor={["Green", "#E9ECF1", "Blue", "Pink", "yellow"]}
                    />
                </Row>
                <H2>Disbursements</H2>
                <div style={{ overflow: "auto" }}>
                    <Table
                        columnTitles={columns}
                        rowItems={requests}
                        onSelectOption={(x, y, event) => event.preventDefault()}
                    />
                </div>
                <ProjectDetailBaseButton
                    onClick={() => navigate(`/${entity}/${projectId}/request`)}
                >
                    Make a Request
                </ProjectDetailBaseButton>
            </ProjectDetailsAreaWrapper>
        </Dashboard>
    );
};
