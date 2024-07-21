import { Dashboard } from "../dashboard";
import { EntitiesAreaWrapper, EntitiesTableWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron/index";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../components/table";
import { useEffect, useState } from "react";
import { getProjectsPerOrganization } from "../../util/apis/getProjectsPerOrganization";
import Cookies from "universal-cookie";
import { retrieveHeaders } from "../../config/retrieveHeaders";

export const ProjectsTableArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();

    const navigate = useNavigate();
    const { entity, entityId } = useParams();
    const [projects, setProjects] = useState([]);
    const [columns, setColumns] = useState(["Project Title", "MDA"]);

    const token = cookie.TOKEN;
    const { roles, organization, organizationId } = cookie.USER || {};

    useEffect(() => {
        if (token && entityId) {
            getProjectsPerOrganization(token, entityId)
                .then((projects) => {
                    const fundingSources = projects.flatMap(project => project.fundings);
                    const currencyNames = retrieveHeaders(fundingSources, "currencyName");

                    setProjects(projects);

                    // Add unique currency columns to the existing columns
                    const uniqueCurrencies = [...new Set(currencyNames)].map(currency => `Allocation in ${currency}`);
                    setColumns((prev) => {
                        const newColumns = ["Project Title", "MDA", ...uniqueCurrencies, "Status"];
                        return newColumns;
                    });
                })
                .catch((err) => console.error("Failed to fetch projects:", err));
        }
    }, [token, entityId]);

    // Ensure that subadmins cannot view project tables of other organizations 
    // asides theirs.
    useEffect(() => {
        if (!roles?.includes("SuperAdmin") && (entity !== organization.replace(/\s+/g, '').toLowerCase() || entityId !== organizationId)) {
            console.error("Error, unauthorized viewership");
            // Optionally navigate to an unauthorized page or display a message
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
                    />
                </EntitiesTableWrapper>
            </EntitiesAreaWrapper>
        </Dashboard>
    );
};
