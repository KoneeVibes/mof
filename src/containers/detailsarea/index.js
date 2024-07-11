import { useParams } from "react-router-dom";
import { Dashboard } from "../dashboard";
import { Row } from "../../components/flex/styled";
import { Card } from "../../components/card";
import { entities } from "../../data";
import { ProjectDetailCardWrapper, ProjectDetailsAreaWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron";
import { InitiativeIcon } from "../../assets";
import { FundingSourceIcon } from "../../assets";
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
                    <Card>
                        <FundingSourceIcon />
                        <h1>{getProject().FundingSource}</h1>
                    </Card>
                </Row>
                <Row
                    tocolumn={1}
                >
                    <Card>
                        <h1>{getProject().name}</h1>
                    </Card>
                    <Card>
                        <h1>{getProject().description}</h1>
                    </Card>
                </Row>
                <h2>Budget Breakdown</h2>
                <Table
                    rowHeads={["Category", "Description", "Amount"]}
                    rowItems={getProject().budget}
                />
            </ProjectDetailsAreaWrapper>
        </Dashboard>
    )
}