import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
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
import { H1 } from "../../components/typography/styled";
// import { Table } from "../../components/table";

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
                        <H1>{getProject().name}</H1>
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
                    <Card>
                        <H1>{getProject().name}</H1>
                    </Card>
                    <Card>
                        <H1>{getProject().description}</H1>
                    </Card>
                </Row>
                <h2>Budget Breakdown</h2>
                <div style={{ overflow: "auto" }}>
                    <Table
                        rowHeads={["Category", "Description", "Amount"]}
                        rowItems={getProject().budget}
                    />
                </div>
                < Row 
                    tocolumn ={1}
                   >
                    <ProjectDetailBaseButton>Accept</ProjectDetailBaseButton>
                    <ProjectDetailBaseButton>Reject</ProjectDetailBaseButton>
                   </Row>
                
                {/* <H2>Comment/Note</H2>
                <TextAreaWrapper /> */}
            </ProjectDetailsAreaWrapper>
        </Dashboard>
    )
}