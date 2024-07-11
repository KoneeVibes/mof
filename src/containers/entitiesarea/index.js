import { Dashboard } from "../dashboard";
import { EntitiesAreaWrapper, EntitiesTableWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron/index";
import { entities } from "../../data";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/table";

export const EntitiesArea = () => {
    //The idea is that this component will hold a generic table that can be reused for ministries or parastatals
    //Depending of say the authorization the endpoint will return data that will populate the table
    const navigate = useNavigate();
    const rows = ["Id", "Parastatal", "Ongoing Project", "Completed Project", "Amount in N", "Amount in E", "Amount in Dollars", "Projects"];
    const navigateToProjectDetails = (project, entityId, projectId) => {
        const parsedEntity = entities.find(entity => entity.id === entityId).entityName.replace(/\s+/g, '').toLowerCase();
        return navigate(`/${parsedEntity}/${projectId}`);
    }
    return (
        <Dashboard>
            <EntitiesAreaWrapper>
                <Jumbotron />
                <EntitiesTableWrapper>
                    <Table
                        rowHeads={rows}
                        rowItems={entities}
                        onSelectProject={navigateToProjectDetails}
                    />
                </EntitiesTableWrapper>
            </EntitiesAreaWrapper>
        </Dashboard>
    )
}