import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { getProjectsPerOrganization } from "../../../util/apis/getProjectsPerOrganization";
import { getAllOrganizations } from "../../../util/apis/getAllOrganizations";
import { Context } from "../../../context";
import { Avatar } from "../../avatar";
import { Li, P } from "../../typography/styled";
import { SideNavItemsListWrapper, SideNavWrapper } from "./styled";
import { Row } from "../../flex/styled";
import { sideNavItems } from "../../../data";
import { DotLoader } from "react-spinners";

export const SideNav = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;
    const navigate = useNavigate();
    const { setIsMenuOpen } = useContext(Context);
    const [listOfProjectPerOrganization, setListOfProjectPerOrganization] =
        useState({
            Ministry: [],
            Department: [],
            Agency: [],
            State: [],
        });
    const [listOfOrganizations, setListOfOrganizations] = useState({
        Ministry: [],
        Department: [],
        Agency: [],
        State: [],
    });
    const [organizationProjects, setOrganizationProjects] = useState([]);
    const [activeEntity, setActiveEntity] = useState(null);
    const [organizations, setOrganizations] = useState([]);
    const [populatedStatus, setPopulatedStatus] = useState({});
    const [loading, setLoading] = useState(false);

    const { role, orgType, organizationId, organization, userId } = cookie.USER || {};
    const entities = [(role === "SuperAdmin", "Subadmin", "DemoUser")].includes(role) ? Object.keys(listOfProjectPerOrganization) : ["Projects"];

    const navigateFromSideBar = (organization, id, e) => {
        setIsMenuOpen(false);
        const parsedOrganization = organization?.replace(/\s+/g, "")?.toLowerCase();
        // handle click of archives
        if (e.currentTarget.getAttribute("data-nav-key") === "archives") {
            return navigate(`/admin/${userId}/archives`);
        }
        // handle click of any of the projects
        if (role !== "SuperAdmin") {
            return navigate(`/${parsedOrganization}/${id}`);
        }
        // handle click of an organization
        return navigate(`/${parsedOrganization}/${id}/projects`);
    };

    const updateListOfOrganizations = async () => {
        try {
            const organizations = await getAllOrganizations(token);
            const Ministry = organizations.filter(
                (org) => org.orgType === "Ministry"
            );
            const Department = organizations.flatMap((org) =>
                org.subOrganizations.filter((subOrg) => subOrg.orgType === "Department")
            );
            const Agency = organizations.flatMap((org) =>
                org.subOrganizations.filter((subOrg) => subOrg.orgType === "Agency")
            );
            const State = organizations.filter((org) => org.orgType === "State");
            setListOfOrganizations({
                Ministry: Ministry,
                Department: Department,
                Agency: Agency,
                State: State,
            });
        } catch (error) {
            console.error("Failed to fetch organizations:", error);
        }
    };

    const getSideNavItems = async (e) => {
        const key = e.currentTarget.getAttribute("data-organization-key");
        setActiveEntity(key);
        setLoading(true);
        // So with the right organization key, we should be able to conditionally
        // update organizationProjects state with different projects array for
        // a superadmin (an array of all projects per orgType) or subadmin (an array of
        // all projects in the logged in user's organization) respectively.
        if ([role === "SuperAdmin", "SubAdmin", "DemoUser"].includes(role)) {
            setOrganizationProjects(listOfProjectPerOrganization[key]);
            await updateListOfOrganizations();
            setLoading(false);
        } else {
            setOrganizationProjects(
                listOfProjectPerOrganization[key]?.filter(
                    (project) => project.organization === organization
                )
            );
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeEntity) {
            setOrganizations(listOfOrganizations[activeEntity]);
        }
    }, [activeEntity, listOfOrganizations]);

    useEffect(() => {
        const updateOrganizationStatus = async () => {
            const status = {};
            if (Array.isArray(organizations) && organizations.length > 0) {
                for (const org of organizations) {
                    if (org.id) {
                        const projectList = await getProjectsPerOrganization(token, org.id);
                        status[org.id] = projectList.length < 1 ? "unpopulated" : null;
                    }
                }
                setPopulatedStatus(status);
            }
        };
        updateOrganizationStatus();
    }, [organizations, token]);

    useEffect(() => {
        if (token && organizationId) {
            getProjectsPerOrganization(token, organizationId)
                .then((projects) => {
                    const Ministry = projects.filter(
                        (project) => project.orgType === "Ministry"
                    );
                    const Department = projects.filter(
                        (project) => project.orgType === "Department"
                    );
                    const Agency = projects.filter(
                        (project) => project.orgType === "Agency"
                    );
                    const State = projects.filter(
                        (project) => project.orgType === "State"
                    );
                    setListOfProjectPerOrganization({
                        Ministry: Ministry,
                        Department: Department,
                        Agency: Agency,
                        State: State,
                    });
                })
                .catch((err) => {
                    console.error("Failed to fetch projects:", err);
                });
        }
    }, [token, organizationId]);

    return (
        <SideNavWrapper>
            <SideNavItemsListWrapper>
                <div>
                    {sideNavItems?.length > 0 && (
                        <P
                            className="navItem"
                            onClick={() => navigate(sideNavItems[0].url)}
                        >
                            {sideNavItems[0].name}
                        </P>
                    )}
                    {entities?.map((entity, key) => (
                        <div key={key}>
                            <Row
                                className="navItem"
                                data-organization-key={[role === "SuperAdmin", "SubAdmin", "DemoUser"].includes(role) ? entity : orgType}
                                onClick={getSideNavItems}
                            >
                                <P
                                    className= "entityItem"
                                    onClick={getSideNavItems}
                                    data-organization-key={
                                        [role === "SuperAdmin", "SubAdmin","DemoUser"].includes(role) ? entity : orgType
                                    }
                                >
                                    {entity}
                                </P>
                                {/* Mirabel, add a drop down symbol here */}
                                <Row  classname= "dotloaderItem">
                                    {loading && entity === activeEntity ?
                                        <DotLoader
                                            size={20}
                                            color="green"
                                            className="dotLoader"
                                        />
                                        :
                                        <i class="fa-solid fa-caret-down" style={{
                                            transform: 
                                                entity === activeEntity
                                                ? "rotate(270deg)" : "rotate(0deg)",
                                            
                                         }}></i>
                                    }
                                </Row>
                            </Row>
                            {(activeEntity === entity || entities.length === 1) && (
                                <ul>
                                    {[role === "SuperAdmin", "SubAdmin", "DemoUser"].includes(role)
                                        ? organizations?.map((organization, k) => (
                                            <Li
                                                key={k}
                                                className={
                                                    populatedStatus[organization.id] === "unpopulated"
                                                        ? "unpopulated"
                                                        : ""
                                                }
                                                onClick={(e) =>
                                                    populatedStatus[organization.id] !==
                                                    "unpopulated" &&
                                                    navigateFromSideBar(
                                                        organization.name,
                                                        organization.id,
                                                        e
                                                    )
                                                }
                                            >
                                                {organization.name}
                                            </Li>
                                        ))
                                        : organizationProjects?.map((project, k) => (
                                            <Li
                                                key={k}
                                                onClick={(e) =>
                                                    navigateFromSideBar(
                                                        project.organization,
                                                        project.projectId,
                                                        e
                                                    )
                                                }
                                            >
                                                {project.title}
                                            </Li>
                                        ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
                <div>
                    {role === "SuperAdmin" && (
                        <P
                            style={{ color: "red" }}
                            data-nav-key={"archives"}
                            onClick={(e) => navigateFromSideBar(undefined, undefined, e)}
                        >
                            Archives
                        </P>
                    )}
                </div>
                <div className="avatar-div">
                    <Avatar location={"side-nav"} />
                </div>
            </SideNavItemsListWrapper>
        </SideNavWrapper>
    );
};
