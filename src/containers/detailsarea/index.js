// import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
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
                <Row
                    tocolumn={1}
                >
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