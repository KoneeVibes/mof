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

export const ProjectDetailsArea = () => {
    const { entityId, projectId } = useParams();
    const getProject = () => {
        const entity = entities.find(entity => entity.entityName.replace(/\s+/g, '').toLowerCase() === entityId);
        const project = entity.projects[projectId];
        return project;
    }

    return (
        <Dashboard>
            <ProjectDetailsAreaWrapper>
                <Jumbotron />
                {/* Your concern is below this line. Understand what is happening very well before you start coding */}
                <Row
                    tocolumn={1}
                >
                    <ProjectDetailCardWrapper>
                        <InitiativeIcon />
                        <h1>{getProject().name}</h1>
                        <p>{getProject().description}</p>
                    </ProjectDetailCardWrapper>
                    <ProjectDetailCardWrapper>
                        <FundingSourceIcon />
                        <h1>Funding Source and Amount </h1>
                        {getProject().fundingSource.map((source, key) => {
                            return (
                                <p key={key}>{source}</p>
                            )
                        })}
                    </ProjectDetailCardWrapper>
                </Row>
                <Row
                    tocolumn={1}
                >
                    <ProjectDetailCardWrapper>
                        <ContractorInformationIcon />
                        <p>Company Name: {getProject().contractorInformation.companyName}</p>
                        <p>Company Email: {getProject().contractorInformation.companyEmail}</p>
                        <p>Company Phone Number: {getProject().contractorInformation.companyPhoneNumber}</p>
                        <p>Company Address: {getProject().contractorInformation.companyAddress}</p>
                    </ProjectDetailCardWrapper>
                    <ProjectDetailCardWrapper>
                        <MilestonesIcon />
                        <h1>Timeline Milestones</h1>
                        {getProject().milestones.map((milestone, key) => {
                            return (
                                <p key={key}>{milestone}</p>
                            )
                        })}
                    </ProjectDetailCardWrapper>
                </Row>
                <h2>Budget Breakdown</h2>
                <div style={{ overflow: "auto" }}>
                    <Table
                        rowHeads={["Category", "Description", "Amount"]}
                        rowItems={getProject().budget}
                    />
                </div>
            </ProjectDetailsAreaWrapper>
        </Dashboard>
    )
}