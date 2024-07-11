import { useParams } from "react-router-dom";
import { Dashboard } from "../dashboard";
import { Row } from "../../components/flex/styled";
import { Card } from "../../components/card";
import { entities } from "../../data";
import { ProjectDetailCardWrapper, ProjectDetailsAreaWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron";
import { InitiativeIcon } from "../../assets";
import { FundingSourceIcon } from "../../assets";
import { ContractorInformationIcon } from "../../assets";
import {MilestonesIcon } from "../../assets";
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
                        <h1>{getProject().name}</h1>
                        <p>{getProject().description}</p>
                    </ProjectDetailCardWrapper>
                    <ProjectDetailCardWrapper>
                        <FundingSourceIcon />
                        <h1>{getProject().FundingSource}</h1>
                    </ProjectDetailCardWrapper>
                </Row>
                <Row
                    tocolumn={1}
                >
                    <Card>
                        <ContractorInformationIcon />
                        <h1>{getProject().contractorInformation}</h1>
                    </Card>
                    <Card>
                        <MilestonesIcon />
                        <h1>{getProject().Milestones}</h1>
                    </Card>
                </Row>
                {/* <Table /> */}
            </ProjectDetailsAreaWrapper>
        </Dashboard>
    )
}