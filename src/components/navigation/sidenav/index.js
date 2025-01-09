import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState, useCallback, Fragment } from "react";
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
import { useQuery } from "@tanstack/react-query";

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
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isFirstPage, setIsFirstPage] = useState(true);
    const [isLastPage, setIsLastPage] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const itemsPerPage = 10;

    const { role, orgType, organizationId, organization, userId } = cookie.USER || {};
    const entities = (role === "SuperAdmin") ? Object.keys(listOfProjectPerOrganization) : ["Projects"];

    const navigateFromSideBar = (organization, id, e) => {
        setIsMenuOpen(false);
        const parsedOrganization = organization?.replace(/\s+/g, "")?.toLowerCase();
        // handle click of archives
        if (e.currentTarget.getAttribute("data-nav-key") === "archives") {
            return navigate(`/admin/${userId}/archives`);
        }
        // handle click of reset password
        if (e.currentTarget.getAttribute("data-nav-key") === "password") {
            return navigate(`/user/${userId}/passwordreset`);
        }
        // handle click of sub admins
        if (e.currentTarget.getAttribute("data-nav-key") === "Sub Admins") {
            return navigate(`/system/sub-admins`);
        }
        // handle click of collections
        if (e.currentTarget.getAttribute("data-nav-key") === "Collections") {
            return navigate(`/system/collections`);
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
            // the getAllOrganizations should filter for search query and 
            // should support pagination
            const organizations = await getAllOrganizations(token);
            const Ministry = organizations?.filter(
                (org) => org.orgType === "Ministry"
            );
            const Department = organizations?.flatMap((org) =>
                org.subOrganizations.filter((subOrg) => subOrg.orgType === "Department")
            );
            const Agency = organizations?.flatMap((org) =>
                org.subOrganizations.filter((subOrg) => subOrg.orgType === "Agency")
            );
            const State = organizations?.filter((org) => org.orgType === "State");
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
        if (role === "SuperAdmin") {
            setOrganizationProjects(listOfProjectPerOrganization[key]);
            await updateListOfOrganizations();
        } else {
            const filteredProjects = listOfProjectPerOrganization[key]?.filter(
                (project) => project.organization === organization
            );
            setOrganizationProjects(filteredProjects);
        };
        setLoading(false);
    };

    const handlePrevious = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => {
            const maxPage = Math.ceil((role === "SuperAdmin" ? organizations.length : organizationProjects.length) / itemsPerPage) - 1;
            return Math.min(prevPage + 1, maxPage);
        });
    };

    const paginatedItems = useCallback((items) => {
        const startIndex = currentPage * itemsPerPage;
        return items?.slice(startIndex, startIndex + itemsPerPage);
    }, [currentPage, itemsPerPage]);

    const { data: populatedStatus } = useQuery({
        queryKey: ['populatedStatus', token, organizations],
        queryFn: async () => {
            if (!Array.isArray(organizations) || organizations.length === 0) {
                return {};
            }
            const status = {};
            await Promise.all(
                organizations.map(async (org) => {
                    if (org?.id) {
                        try {
                            const projectList = await getProjectsPerOrganization(token, org.id);
                            status[org.id] = projectList?.length < 1 ? "unpopulated" : null;
                        } catch (error) {
                            console.error(`Error fetching projects for organization ${org.id}:`, error);
                        }
                    }
                })
            );
            return status;
        },
        enabled: !!token && Array.isArray(organizations) && organizations.length > 0,
    });

    useEffect(() => {
        setIsFirstPage(currentPage === 0);
        const items = role === "SuperAdmin" ? organizations : organizationProjects;
        setIsLastPage(currentPage === Math.ceil(items?.length / itemsPerPage) - 1);
        setIsEmpty(paginatedItems(items)?.length === 0);
    }, [currentPage, organizations, organizationProjects, role, itemsPerPage, paginatedItems]);

    useEffect(() => {
        if (activeEntity) {
            setOrganizations(listOfOrganizations[activeEntity]);
        }
    }, [activeEntity, listOfOrganizations]);

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
                                data-organization-key={role === "SuperAdmin" ? entity : orgType}
                                onClick={getSideNavItems}
                            >
                                <P
                                    className="entityItem"
                                    onClick={getSideNavItems}
                                    data-organization-key={
                                        role === "SuperAdmin" ? entity : orgType
                                    }
                                >
                                    {entity}
                                </P>
                                <div className="dotloaderItem">
                                    {(loading && (entity === activeEntity || role !== "SuperAdmin")) ?
                                        <DotLoader
                                            size={20}
                                            color="green"
                                            className="dotLoader"
                                        />
                                        :
                                        <i className="fa-solid fa-caret-down" style={{
                                            transform:
                                                entity === activeEntity
                                                    ? "rotate(270deg)" : "rotate(0deg)",
                                        }}></i>
                                    }
                                </div>
                            </Row>
                            {/* First condition sets the dropdown to toggle appropriately for superadmin
                            The second condition sets the dropdown to toggle properly for sub admin and users */}
                            {(activeEntity === entity || (entities.length === 1 && (organizationProjects && organizationProjects.length > 0))) && (
                                <ul>
                                    {role === "SuperAdmin"
                                        ? paginatedItems(organizations)?.map((organization, k) => (
                                            <Li
                                                key={k}
                                                className={
                                                    populatedStatus && populatedStatus?.[organization.id] === "unpopulated"
                                                        ? "unpopulated"
                                                        : ""
                                                }
                                                onClick={(e) =>
                                                    populatedStatus?.[organization.id] !==
                                                    "unpopulated" &&
                                                    navigateFromSideBar(
                                                        organization.name,
                                                        organization.id,
                                                        e
                                                    )
                                                }
                                            >
                                                {organization.name.replace(/\b\w/g, char => char.toUpperCase())}
                                            </Li>
                                        ))
                                        : paginatedItems(organizationProjects)?.map((project, k) => (
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
                                                {project.title.replace(/\b\w/g, char => char.toUpperCase())}
                                            </Li>
                                        ))}
                                </ul>
                            )}
                            {(activeEntity === entity || (entities.length === 1 && (organizationProjects && organizationProjects.length > 0))) && (
                                <Row
                                    className="pagination"
                                >
                                    <P
                                        className={`previous-button ${isFirstPage || isEmpty ? "disable-click" : ""}`}
                                        onClick={handlePrevious}
                                    >
                                        Previous
                                    </P>
                                    <P
                                        className={`next-button ${isLastPage || isEmpty ? "disable-click" : ""}`}
                                        onClick={handleNext}
                                    >
                                        Next
                                    </P>
                                </Row>
                            )}
                        </div>
                    ))}
                </div>
                <div className="side-nav-action-item">
                    < P
                        style={{
                            color: "red",
                            padding: (role === "SuperAdmin") ? "var(--cardPadding) var(--cardPadding) 0 var(--cardPadding)" : "var(--cardPadding)"
                        }}
                        data-nav-key={"password"}
                        onClick={(e) => navigateFromSideBar(undefined, undefined, e)}
                    >
                        Password Reset
                    </P>
                    {(role === "SuperAdmin") && (
                        <Fragment>
                            <Row
                                className="other-controls"
                                onClick={() => setShowMore(!showMore)}
                            >
                                <P
                                    style={{ color: "red", flex: 1 }}
                                >
                                    Other Controls
                                </P>
                                <div className="dotloaderItem">
                                    <i className="fa-solid fa-caret-down" style={{
                                        transform:
                                            showMore
                                                ? "rotate(270deg)" : "rotate(0deg)",
                                    }}></i>
                                </div>
                            </Row>
                            <div
                                style={{ display: showMore ? "block" : "none" }}
                            >
                                <P
                                    style={{ color: "red", padding: "0 var(--cardPadding)", paddingLeft: "calc(var(--cardPadding) * 2)" }}
                                    data-nav-key={"archives"}
                                    onClick={(e) => navigateFromSideBar(undefined, undefined, e)}
                                >
                                    Archives
                                </P>
                                <P
                                    style={{ color: "red", padding: "var(--cardPadding) var(--cardPadding) 0", paddingLeft: "calc(var(--cardPadding) * 2)" }}
                                    data-nav-key={"Sub Admins"}
                                    onClick={(e) => navigateFromSideBar(undefined, undefined, e)}
                                >
                                    Sub Admins
                                </P>
                                <P
                                    style={{ color: "red", paddingLeft: "calc(var(--cardPadding) * 2)" }}
                                    data-nav-key={"Collections"}
                                    onClick={(e) => navigateFromSideBar(undefined, undefined, e)}
                                >
                                    Collections
                                </P>
                            </div>
                        </Fragment>
                    )}
                </div>
                <div className="avatar-div">
                    <Avatar location={"side-nav"} />
                </div>
            </SideNavItemsListWrapper>
        </SideNavWrapper >
    );
};
