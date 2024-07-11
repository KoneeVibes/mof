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
import { H1, H2 } from "../../components/typography/styled";
import { TextAreaWrapper } from "../../components/formfields/textarea/styled";

export const ProjectDetailsArea = () => {
    const { entityId, projectId } = useParams();

    const getProject = () => {
        try {
            const entity = entities.find(entity => entity.entityName.replace(/\s+/g, '').toLowerCase() === entityId);
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
                        <H1>{project.name}</H1>
                        <p>{project.description}</p>
                    </ProjectDetailCardWrapper>
                    <ProjectDetailCardWrapper>
                        <FundingSourceIcon />
                        <h1>Funding Source and Amount </h1>
                        {project.fundingSource.map((source, key) => (
                            <p key={key}>{source}</p>
                        ))}
                    </ProjectDetailCardWrapper>
                </Row>
                <Row tocolumn={1}>
                    <ProjectDetailCardWrapper>
                        <ContractorInformationIcon />
                        <p>Company Name: {project.contractorInformation.companyName}</p>
                        <p>Company Email: {project.contractorInformation.companyEmail}</p>
                        <p>Company Phone Number: {project.contractorInformation.companyPhoneNumber}</p>
                        <p>Company Address: {project.contractorInformation.companyAddress}</p>
                    </ProjectDetailCardWrapper>
                    <ProjectDetailCardWrapper>
                        <MilestonesIcon />
                        <h1>Timeline Milestones</h1>
                        {project.milestones.map((milestone, key) => (
                            <p key={key}>{milestone}</p>
                        ))}
                    </ProjectDetailCardWrapper>
                </Row>
                <H2>Budget Breakdown</H2>
                <div style={{ overflow: "auto" }}>
                    <Table rowHeads={["Category", "Description", "Amount"]} rowItems={project.budget} />
                </div>
                <H2>Comment/Note</H2>
                <TextAreaWrapper />
                <Row tocolumn={1}>
                    <ProjectDetailBaseButton>Accept</ProjectDetailBaseButton>
                    <ProjectDetailBaseButton>Reject</ProjectDetailBaseButton>
                </Row>
            </ProjectDetailsAreaWrapper>
        </Dashboard>
    )
}