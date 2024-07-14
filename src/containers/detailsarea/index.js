import { useParams } from "react-router-dom";
import { Dashboard } from "../dashboard";
import { Row } from "../../components/flex/styled";
import { ProjectDetailCardWrapper, ProjectDetailsAreaWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron";
import { InitiativeIcon } from "../../assets";
import { FundingSourceIcon } from "../../assets";
import { ContractorInformationIcon } from "../../assets";
import { MilestonesIcon } from "../../assets";
import { Table } from "../../components/table";
import { ProjectDetailBaseButton } from "./styled";
import { H1, H2, H3, P } from "../../components/typography/styled";
import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
import { ProjectDetailButtonsWrapper } from "./styled";
import { useEffect, useState } from "react";
import { getProject } from "../../util/apis/getProject";

export const ProjectDetailsArea = () => {
    const { projectId } = useParams();
    const columns = ["Category", "Description", "Amount"];
    const [project, setProject] = useState({});

    useEffect(() => {
        getProject(projectId).then((project) => setProject(project));
    }, [projectId]);

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
                    <ProjectDetailCardWrapper>
                        <InitiativeIcon />
                        <H1>{project.projectTitle}</H1>
                        <P>{project.description}</P>
                    </ProjectDetailCardWrapper>
                    <ProjectDetailCardWrapper>
                        <FundingSourceIcon />
                        <H3>Funding Source and Amount </H3>
                        {project.fundingSources.map((source, key) => (
                            <P key={key}>{source}</P>
                        ))}
                    </ProjectDetailCardWrapper>
                </Row>
                <Row tocolumn={1}>
                    <ProjectDetailCardWrapper>
                        <ContractorInformationIcon />
                        <P>Company Name: {project.contractor.name}</P>
                        <P>Company Email: {project.contractor.email}</P>
                        <P>Company Phone Number: {project.contractor.companyPhoneNumber}</P>
                        <P>Company Address: {project.contractor.companyAddress}</P>
                    </ProjectDetailCardWrapper>
                    <ProjectDetailCardWrapper>
                        <MilestonesIcon />
                        <H3>Timeline Milestones</H3>
                        {project.timelineMilestones.map((milestone, key) => (
                            <P key={key}>Q what? {milestone.text}</P>
                        ))}
                    </ProjectDetailCardWrapper>
                </Row>
                <H2>Budget Breakdown</H2>
                {/* should clean up this inline style later */}
                <div style={{ overflow: "auto" }}>
                    <Table
                        columnTitles={columns}
                        rowItems={project.budget}
                        isBudgetTable={1}
                    />
                </div>
                <H2>Comment/Note</H2>
                <TextAreaWrapper/>
                <ProjectDetailButtonsWrapper>
                    <ProjectDetailBaseButton>Accept</ProjectDetailBaseButton>
                    <ProjectDetailBaseButton>Reject</ProjectDetailBaseButton>
                </ProjectDetailButtonsWrapper>
            </ProjectDetailsAreaWrapper>
        </Dashboard>
    )
}