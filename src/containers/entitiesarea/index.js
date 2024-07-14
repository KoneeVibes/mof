import { Dashboard } from "../dashboard";
import { EntitiesAreaWrapper, EntitiesTableWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron/index";
import { useNavigate } from "react-router-dom";
import { Table } from "../../components/table";
import { useEffect, useState } from "react";
import { getProjectsPerOrganization } from "../../util/apis/getProjects";
import { getOrganization } from "../../util/apis/getOrganization";
import Cookies from "universal-cookie";

export const EntitiesArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();

    const navigate = useNavigate();
    const [projectsPerOrganization, setProjectsPerOrganization] = useState([]);
    const [subOrganizations, setSubOrganizations] = useState([]);

    const token = cookie.TOKEN;
    const organizationId = cookie.USER.organizationId;
    const columns = ["Parastatal", "Ongoing Project", "Completed Project", "Amount in ₦", "Amount in £", "Amount in $", "Projects"];

    useEffect(() => {
        getProjectsPerOrganization(token, organizationId).then((projectList) => setProjectsPerOrganization(projectList));
    }, [token, organizationId]);

    useEffect(() => {
        getOrganization(token, organizationId).then((organization) => setSubOrganizations(organization.subOrganizations));
    }, [token, organizationId]);

    const navigateToProjectDetails = (project, projectId) => {
        //if there is an error here, check the properties of project
        navigate(`/${project}/${projectId}`);
    };

    return (
        <Dashboard>
            <EntitiesAreaWrapper>
                <Jumbotron />
                <EntitiesTableWrapper>
                    <Table
                        columnTitles={columns}
                        options={projectsPerOrganization}
                        rowItems={subOrganizations}
                        onSelectOption={navigateToProjectDetails}
                    />
                </EntitiesTableWrapper>
            </EntitiesAreaWrapper>
        </Dashboard>
    );
};
