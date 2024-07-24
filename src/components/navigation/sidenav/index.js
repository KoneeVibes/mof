import { useNavigate } from "react-router-dom";
import { sideNavItems } from "../../../data";
import { Avatar } from "../../avatar";
import { Li, P } from "../../typography/styled";
import { SideNavItemsListWrapper, SideNavWrapper } from "./styled";
import Cookies from "universal-cookie";
import { useContext, useEffect, useState } from "react";
import { Row } from "../../flex/styled";
import { getProjectsPerOrganization } from "../../../util/apis/getProjectsPerOrganization";
import { Context } from "../../../context";
import { getAllOrganizations } from "../../../util/apis/getAllOrganizations";

export const SideNav = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const navigate = useNavigate();
    const { setIsMenuOpen } = useContext(Context);
    const [listOfProjectPerOrganization, setListOfProjectPerOrganization] = useState({
        Ministry: [],
        Parastatal: [],
        Agency: [],
    });
    const [listOfOrganizations, setListOfOrganizations] = useState({
        Ministry: [],
        Parastatal: [],
        Agency: []
    });
    const [organizationProjects, setOrganizationProjects] = useState([]);
    const [activeEntity, setActiveEntity] = useState(null);
    const [organizations, setOrganizations] = useState([]);

    const { roles, orgType, organizationId, organization, userId } = cookie.USER || {};
    const entities = roles?.includes("SuperAdmin") ? Object.keys(listOfProjectPerOrganization) : ["Projects"];

    const navigateFromSideBar = (organization, id, e) => {
        setIsMenuOpen(false);
        const parsedOrganization = organization?.replace(/\s+/g, '').toLowerCase();
        if (!roles?.includes("SuperAdmin")) {
            return navigate(`/${parsedOrganization}/${id}`);
        }
        if (e.currentTarget.getAttribute("data-nav-key") === "Disbursement Requests") {
            return navigate(`/${userId}/approvals`);
        }
        return navigate(`/${parsedOrganization}/${id}/projects`);
    }

    const updateListOfOrganizations = async () => {
        try {
            const organizations = await getAllOrganizations(token);
            const Ministry = organizations.filter(org => org.orgType === "Ministry");
            const Parastatal = organizations.flatMap(org =>
                org.subOrganizations.filter(subOrg => subOrg.orgType === "Parastatal")
            );
            const Agency = organizations.flatMap(org =>
                org.subOrganizations.filter(subOrg => subOrg.orgType === "Agency")
            );
            setListOfOrganizations((prev) => ({
                ...prev,
                Ministry: Ministry,
                Parastatal: Parastatal,
                Agency: Agency,
            }));
        } catch (error) {
            console.error("Failed to fetch organizations:", error);
        }
    };

    const getSideNavItems = async (e) => {
        const key = e.currentTarget.getAttribute("data-organization-key");
        setActiveEntity(key);
        // So with the right organization key, we should be able to conditionally
        // update organizationProjects state with different projects array for 
        // a superadmin (an array of all projects per orgType) or subadmin (an array of
        // all projects in the logged in user's organization) respectively.
        if (roles?.includes("SuperAdmin")) {
            setOrganizationProjects(listOfProjectPerOrganization[key]);
            await updateListOfOrganizations();
            // return navigate(`/${parsedOrganization}/${projectId}`);
        } else {
            setOrganizationProjects(listOfProjectPerOrganization[key]?.filter((project) => project.organization === organization));
        }
    };

    useEffect(() => {
        setOrganizations(listOfOrganizations[activeEntity]);
    }, [activeEntity, listOfOrganizations])

    useEffect(() => {
        if (token && organizationId) {
            getProjectsPerOrganization(token, organizationId)
                .then((projects) => {
                    const Ministry = projects.filter((project) => project.orgType === "Ministry");
                    const Parastatal = projects.filter((project) => project.orgType === "Parastatal");
                    const Agency = projects.filter((project) => project.orgType === "Agency");
                    setListOfProjectPerOrganization((prev) => ({
                        ...prev,
                        Ministry: Ministry,
                        Parastatal: Parastatal,
                        Agency: Agency,
                    }));
                })
                .catch((err) => {
                    console.error("Failed to fetch projects:", err);
                });
        }
    }, [token, organizationId, cookie.USER]);

    return (
        <SideNavWrapper>
            <SideNavItemsListWrapper>
                <div>
                    {sideNavItems?.length > 0 && (
                        <P onClick={() => navigate(sideNavItems[0].url)}>
                            {sideNavItems[0].name}
                        </P>
                    )}
                    {entities?.map((entity, key) => (
                        <div key={key}>
                            <Row
                                className="entity"
                                //Here, we want to update the organization-key attribute with the indexed
                                //entity (in the case of superadmin) and with orgType in the case of a subadmin
                                data-organization-key={roles?.includes("SuperAdmin") ? entity : orgType}
                                onClick={getSideNavItems}
                            >
                                <P
                                    //Had to repeat this here because of bubbling/propagation bugs.
                                    //should clean up in later version
                                    onClick={getSideNavItems}
                                    data-organization-key={roles?.includes("SuperAdmin") ? entity : orgType}
                                >
                                    {entity}
                                </P>
                                {/* Mirabel, add a drop down symbol here */}
                            </Row>
                            {/* Here, we just conditionally show projects based on which OrgType is clicked (for super
                            admin) or all projects (for a single-organization-authorized subadmin or user) */}
                            {(activeEntity === entity || entities.length === 1) && (
                                <ul>
                                    {roles?.includes("SuperAdmin") ? (
                                        organizations?.map((organization, k) => (
                                            <Li
                                                key={k}
                                                onClick={(e) => navigateFromSideBar(organization.name, organization.id, e)}
                                            >
                                                {organization.name}
                                            </Li>
                                        ))
                                    ) : (
                                        organizationProjects?.map((project, k) => (
                                            <Li
                                                key={k}
                                                onClick={(e) => navigateFromSideBar(project.organization, project.projectId, e)}
                                            >
                                                {project.title}
                                            </Li>
                                        ))
                                    )}
                                </ul>
                            )}
                        </div>
                    ))}
                    {cookie.USER.roles.includes("SuperAdmin") && (
                        <P
                            data-nav-key="Disbursement Requests"
                            onClick={(e) => navigateFromSideBar(undefined, undefined, e)}
                        >
                            Disbursement Requests
                        </P>
                    )}
                </div>
                <div className="avatar-div">
                    <Avatar location={"side-nav"} />
                </div>
            </SideNavItemsListWrapper>
        </SideNavWrapper>
    );
}
