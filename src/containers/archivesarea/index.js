import Cookies from "universal-cookie";
import { Table } from "../../components/table";
import { Layout } from "../layout/index";
import { ArchivesAreaWrapper, ArchivesAreaTableWrapper } from "./styled";
import { getDashboardMetrics } from "../../util/apis/getDashboardMetrics";
import { useEffect, useState } from "react";
import { Jumbotron } from "../../components/jumbotron";
import { H1, P } from "../../components/typography/styled";
import { getExcelSheet } from "../../util/apis/getExcelSheet";
import { getActions } from "../../config/actions";
import { updateProjectStatus } from "../../util/apis/updateProjectStatus";

export const ArchivesArea = () => {
  const cookies = new Cookies();
  const cookie = cookies.getAll();
  const token = cookie.TOKEN;
  const categories = [
    "Project Title",
    "MDA",
    "Allocation",
    "Disbursement",
    "Funding Balance",
    "Status",
  ];
  let orgId =
    cookie.USER.role === "SuperAdmin" ? "" : cookie.USER.organizationId;

<<<<<<< HEAD
  const [dashboardOverview, setDashboardOverview] = useState(null);
  const [projects, setProjects] = useState([]);

  const exportToExcel = async (e) => {
    e.preventDefault();
    // Loader starts
    try {
      const blob = await getExcelSheet(token, "dashboard");
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // may have to come back to reset this filename
      a.download = "export.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url); // Clean up
      // Loader stops
      console.log("Successfully exported to an xlsx file");
    } catch (error) {
      // Loader stops
      console.error("Failed to export:", error);
=======
    const [dashboardOverview, setDashboardOverview] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    const exportToExcel = async (e) => {
        e.preventDefault();
        // Loader starts
        try {
            const blob = await getExcelSheet(token, "dashboard");
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            // may have to come back to reset this filename
            a.download = 'export.xlsx';
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url); // Clean up
            // Loader stops
            console.log("Successfully exported to an xlsx file");
        } catch (error) {
            // Loader stops
            console.error("Failed to export:", error);
        }
    };

    const handleStatusChange = async (event, projectId) => {
        const value = event?.target?.value;
        setLoading(true)
        try {
            let response;
            switch (value) {
                case "Approve":
                    response = await updateProjectStatus(token, {
                        projectId: parseInt(projectId),
                        option: "approve",
                    });
                    break;
                case "Terminate":
                    response = await updateProjectStatus(token, {
                        projectId: parseInt(projectId),
                        option: "terminate",
                    });
                    break;
                case "Re-open":
                    response = await updateProjectStatus(token, {
                        projectId: parseInt(projectId),
                        option: "reopen",
                    });
                    break;
                case "Close":
                    response = await updateProjectStatus(token, {
                        projectId: parseInt(projectId),
                        option: "close",
                    });
                    break;
                default:
                    return;
            }
            if (response.status !== "success") {
                setLoading(false)
                console.error(
                    "Error in calling update project status inside dashboard overview area"
                );
            } else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false)
            console.error("Failed to update:", error);
        }
    };

    useEffect(() => {
        getDashboardMetrics(token, orgId)
            .then((data) => {
                setDashboardOverview(data);
                setProjects(data.projectsAllocationMetrics.filter((project) => project.status === "Terminated" || project.status === "Closed"));
            })
            .catch((err) => {
                console.error('Failed to fetch dashboard metrics:', err);
            })
    }, [orgId, token, loading]);

    if (!cookie.USER.role === "SuperAdmin") {
        return (
            <Layout>
                <ArchivesAreaWrapper>
                    <Jumbotron />
                    <H1>Unauthorized</H1>
                    <P>You are not authorized to view this page</P>
                </ArchivesAreaWrapper>
            </Layout>
        );
>>>>>>> 89ada3bb910f2ebe10249532c2e5395af5ef51c7
    }
  };

  useEffect(() => {
    getDashboardMetrics(token, orgId)
      .then((data) => {
        setDashboardOverview(data);
        setProjects(
          data.projectsAllocationMetrics.filter(
            (project) => project.status !== "Ongoing"
          )
        );
      })
      .catch((err) => {
        console.error("Failed to fetch dashboard metrics:", err);
      });
  }, [orgId, token]);

  if (!cookie.USER.role === "SuperAdmin") {
    return (
<<<<<<< HEAD
      <Layout>
        <ArchivesAreaWrapper>
          <Jumbotron />
          <H1>Unauthorized</H1>
          <P>You are not authorized to view this page</P>
        </ArchivesAreaWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <ArchivesAreaWrapper>
        <Jumbotron entity={"ARCHIVES"} />
        <ArchivesAreaTableWrapper>
          <Table
            location={"archivesArea"}
            categories={categories}
            rowItems={projects}
            uniqueCurrencies={[
              ...new Set(
                dashboardOverview?.projectsAllocationMetrics
                  ?.filter((project) => project.status !== "Ongoing")
                  .flatMap((project) =>
                    project.totalAllocations.map(
                      (allocation) => allocation.currencyName
                    )
                  ) || []
              ),
            ]}
            role={cookie.USER.role}
            onSelectOption={(_, __, e) => e.preventDefault()}
            exportToExcel={exportToExcel}
          />
        </ArchivesAreaTableWrapper>
      </ArchivesAreaWrapper>
    </Layout>
  );
};
=======
        <Layout>
            <ArchivesAreaWrapper>
                <Jumbotron entity={cookie?.USER?.organization} />
                <ArchivesAreaTableWrapper>
                    <Table
                        location={"archivesArea"}
                        categories={categories}
                        rowItems={projects}
                        uniqueCurrencies={[...new Set(
                            dashboardOverview?.projectsAllocationMetrics?.filter((project) => project.status !== "Ongoing").flatMap(project =>
                                project.totalAllocations.map(allocation => allocation.currencyName)
                            ) || []
                        )]}
                        actions={getActions}
                        handleStatusChange={handleStatusChange}
                        role={cookie.USER.role}
                        onSelectOption={(_, __, e) => e.preventDefault()}
                        exportToExcel={exportToExcel}
                    />
                </ArchivesAreaTableWrapper>
            </ArchivesAreaWrapper>
        </Layout>
    )
}
>>>>>>> 89ada3bb910f2ebe10249532c2e5395af5ef51c7
