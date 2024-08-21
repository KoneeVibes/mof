import { Layout } from "../layout";
import { EntitiesAreaWrapper, EntitiesTableWrapper } from "./styled";
import { Jumbotron } from "../../components/jumbotron/index";
import { useNavigate, useParams } from "react-router-dom";
import { Table } from "../../components/table";
import { useEffect, useState } from "react";
import { getProjectsPerOrganization } from "../../util/apis/getProjectsPerOrganization";
import Cookies from "universal-cookie";
import { getExcelSheet } from "../../util/apis/getExcelSheet";

export const ProjectsTableArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const categories = ["Project Title", "Allocation", "Status"];
    const filterOptions = ["Ongoing", "Closed", "Terminated"];

    const navigate = useNavigate();
    const { entity, entityId } = useParams();
    const [projects, setProjects] = useState([]);
    // const [columns, setColumns] = useState(categories);
    const [uniqueCurrencies, setUniqueCurrencies] = useState([]);
    const [filterOption, setFilterOption] = useState("");

    const token = cookie.TOKEN;
    const { role, organization, organizationId } = cookie.USER || {};

    const exportToExcel = async (e) => {
        e.preventDefault();
        // Loader starts
        try {
            const blob = await getExcelSheet(token, "projects");
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            // may have to come back to reset this filename
            a.download = 'export.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            // Loader stops
            console.log("Successfully exported to an xlsx file");
        } catch (error) {
            // Loader stops
            console.error("Failed to export:", error);
        }
    };

    const handleFilterOptionsChange = (e) => {
        const { value } = e.target;
        setFilterOption(value);
    }

    useEffect(() => console.log(filterOption), [filterOption]);

    useEffect(() => {
        if (token && entityId) {
            getProjectsPerOrganization(token, entityId)
                .then((response) => {
                    setProjects(response);

                    const fundingSources = projects.flatMap(project => project.fundings);
                    const currencyNames = [...new Set(fundingSources.map(funding => funding.currencyName))];
                    setUniqueCurrencies(currencyNames);

                    // const newColumns = ["Project Title", ...currencyNames.map(currency => `${currency}`), "Status"];
                    // setColumns(newColumns);
                })
                .catch((err) => console.error("Failed to fetch projects:", err));
        }
    }, [token, entityId, projects]);

    useEffect(() => {
        if ((role !== "SuperAdmin") && (entity !== organization.replace(/\s+/g, '').toLowerCase() || entityId !== organizationId)) {
            console.error("Error, unauthorized viewership");
        }
    }, [role, entity, organization, entityId, organizationId]);

    const navigateToProjectDetails = (organization, projectId, event) => {
        navigate(`/${organization.replace(/\s+/g, '').toLowerCase()}/${projectId}`);
    };

    return (
        <Layout>
            <EntitiesAreaWrapper>
                <Jumbotron entity={projects[0]?.organization} />
                <EntitiesTableWrapper>
                    <Table
                        categories={categories}
                        // columnTitles={columns}
                        rowItems={projects}
                        onSelectOption={navigateToProjectDetails}
                        uniqueCurrencies={uniqueCurrencies}
                        location={"projectsTableArea"}
                        exportToExcel={exportToExcel}
                        options={filterOptions}
                        filterOption={filterOption}
                        handleFilterOptionsChange={handleFilterOptionsChange}
                    />
                </EntitiesTableWrapper>
            </EntitiesAreaWrapper>
        </Layout>
    );
};
