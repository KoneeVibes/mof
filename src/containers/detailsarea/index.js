import { useParams } from "react-router-dom";
import { Dashboard } from "../dashboard";
import { Row } from "../../components/flex/styled";
import { entities } from "../../data";
import { ProjectDetailCardWrapper, ProjectDetailsAreaWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron";
import { InitiativeIcon } from "../../assets";
import { FundingSourceIcon } from "../../assets";
import { ContractorInformationIcon } from "../../assets";
import { MilestonesIcon } from "../../assets";
import { Table } from "../../components/table";
import { ProjectDetailBaseButton } from "./styled";
import { H1, H2, P } from "../../components/typography/styled";
import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
import { ProjectDetailButtonsWrapper } from "./styled";

export const ProjectDetailsArea = () => {
    const { entityId, projectId } = useParams();

    const getProject = () => {
        try {
            const entity = entities[0].division.find(entity => entity.entityName.replace(/\s+/g, '').toLowerCase() === entityId);
            if (!entity) throw new Error("Entity not found");

            const project = entity.projects[projectId];
            if (!project) throw new Error("Project not found");

            return project;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const project = getProject();

    if (!project) {
        return (
            <Dashboard>
                <ProjectDetailsAreaWrapper>
                    <Jumbotron />
                    <H1>Project not found</H1>
                    <p>We couldn't find the project you were looking for. Please check the URL or try again later.</p>
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
                        <H1>{getProject().name}</H1>
                        <P>{getProject().description}</P>
                    </ProjectDetailCardWrapper>
                    <ProjectDetailCardWrapper>
                        <FundingSourceIcon />
                        <H1>Funding Source and Amount </H1>
                        {getProject().fundingSource.map((source, key) => {
                            return (
                                <P key={key}>{source}</P>
                            )
                        })}
                    </ProjectDetailCardWrapper>
                </Row>
                <Row tocolumn={1}>
                    <ProjectDetailCardWrapper>
                        <ContractorInformationIcon />
                        <P>Company Name: {getProject().contractorInformation.companyName}</P>
                        <P>Company Email: {getProject().contractorInformation.companyEmail}</P>
                        <P>Company Phone Number: {getProject().contractorInformation.companyPhoneNumber}</P>
                        <P>Company Address: {getProject().contractorInformation.companyAddress}</P>
                    </ProjectDetailCardWrapper>
                    <ProjectDetailCardWrapper>
                        <MilestonesIcon />
                        <H1>Timeline Milestones</H1>
                        {getProject().milestones.map((milestone, key) => {
                            return (
                                <P key={key}>{milestone}</P>
                            )
                        })}
                    </ProjectDetailCardWrapper>
                </Row>
                <H2>Budget Breakdown</H2>
                <div style={{ overflow: "auto" }}>
                    <Table rowHeads={["Category", "Description", "Amount"]} rowItems={project.budget} />
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