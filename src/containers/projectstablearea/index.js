import { Dashboard } from "../dashboard";
import { EntitiesAreaWrapper, EntitiesTableWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron/index";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../components/table";
import { useEffect, useState } from "react";
import { getProjectsPerOrganization } from "../../util/apis/getProjectsPerOrganization";
import Cookies from "universal-cookie";

export const ProjectsTableArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();

    const navigate = useNavigate();
    const { entity, entityId } = useParams();
    const [projects, setProjects] = useState([]);
    const [columns, setColumns] = useState(["Project Title", "MDA", "Status"]);
    const [uniqueCurrencies, setUniqueCurrencies] = useState([]);

    const token = cookie.TOKEN;
    const { roles, organization, organizationId } = cookie.USER || {};

    useEffect(() => {
        if (token && entityId) {
            getProjectsPerOrganization(token, entityId)
                .then((response) => {
                    setProjects(response);

                    const fundingSources = projects.flatMap(project => project.fundings);
                    const currencyNames = [...new Set(fundingSources.map(funding => funding.currencyName))];
                    setUniqueCurrencies(currencyNames);

                    const newColumns = ["Project Title", "MDA", ...currencyNames.map(currency => `Fundings in ${currency}`), "Status"];
                    setColumns(newColumns);
                })
                .catch((err) => console.error("Failed to fetch projects:", err));
        }
    }, [token, entityId, projects]);

    useEffect(() => {
        if (!roles?.includes("SuperAdmin") && (entity !== organization.replace(/\s+/g, '').toLowerCase() || entityId !== organizationId)) {
            console.error("Error, unauthorized viewership");
        }
    }, [roles, entity, organization, entityId, organizationId]);

    const navigateToProjectDetails = (organization, projectId, event) => {
        navigate(`/${organization.replace(/\s+/g, '').toLowerCase()}/${projectId}`);
    };

    return (
        <Dashboard>
            <EntitiesAreaWrapper>
                <Jumbotron />
                <EntitiesTableWrapper>
                    <Table
                        columnTitles={columns}
                        rowItems={projects}
                        onSelectOption={navigateToProjectDetails}
                        uniqueCurrencies={uniqueCurrencies}
                        location={"projectsTableArea"}
                    />
                </EntitiesTableWrapper>
            </EntitiesAreaWrapper>
        </Dashboard>
    );
};
