import { useParams } from "react-router-dom";
import { Dashboard } from "../dashboard";
import { Row } from "../../components/flex/styled";
import { Card } from "../../components/card";
import { entities } from "../../data";
import { ProjectDetailsAreaWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron";
import { InitiativeIcon } from "../../assets";
import { FundingSourceIcon } from "../../assets";
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
                    <Card>
                        <InitiativeIcon />
                        <H1>{getProject().name}</H1>
                        <p>{getProject().description}</p>
                    </Card>
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
                        <H1>{getProject().description}</H1>
                    </Card>
                </Row>
                {/* <Table /> */}
            </ProjectDetailsAreaWrapper>
        </Dashboard>
    )
}