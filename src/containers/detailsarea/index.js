import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../layout";
import { Column, Row } from "../../components/flex/styled";
import {
  ProjectDetailActionRow,
  ProjectDetailCardWrapper,
  ProjectDetailEditModal,
  ProjectDetailsAreaWrapper,
} from "./styled";
import { Jumbotron } from "../../components/jumbotron";
import { InitiativeIcon, FundingSourceIcon } from "../../assets";
import { Table } from "../../components/table";
import { ProjectDetailBaseButton } from "./styled";
import { H1, H2, H3, Li, P } from "../../components/typography/styled";
import { useEffect, useRef, useState } from "react";
import { getProject } from "../../util/apis/getProject";
import Cookies from "universal-cookie";
import { BarChart } from "../../components/barchart";
import { deleteDisbursement } from "../../util/apis/deleteDisbursement";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { updateProjectStatus } from "../../util/apis/updateProjectStatus";
import { getExcelSheet } from "../../util/apis/getExcelSheet";
import { DetailsEditArea } from "../detailseditarea";
import { getFilteredDisbursements } from "../../util/apis/getFilteredDisbursements";
import { getProjectMembers } from "../../util/apis/getProjectMembers";
import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
import { DotLoader } from "react-spinners";
import { BaseButton } from "../../components/buttons/index";
import { postRemark } from "../../util/apis/postRemark";
import { getActions } from "../../config/actions";

export const ProjectDetailsArea = () => {
  const cookies = new Cookies();
  const cookie = cookies.getAll();
  const token = cookie.TOKEN;
  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState([
    "Date Disbursed",
    "Posted By",
    "Purpose",
    "Amount",
    "Attachment",
    "Status",
    ...(cookie.USER.role === "Individual" ? ["Action"] : []),
  ]);
  const status = ["Paid", "Not Paid"];

  const modalRefs = {
    basic: useRef(null),
    beneficiaries: useRef(null),
    funding: useRef(null),
  };
  const detailsEditAreaRef = useRef(null);
  const navigate = useNavigate();
  const { entity, projectId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [currencies, setCurrencies] = useState([]);
  const [requests, setRequests] = useState([]);
  const [project, setProject] = useState(null);
  const [projectStatus, setProjectStatus] = useState(project?.status);
  const [activeEditModal, setActiveEditModal] = useState(null);
  const [editArea, setEditArea] = useState(null);
  const [shouldShowDetailsEditArea, setShouldShowDetailsEditArea] =
    useState(false);
  const [formDetails, setFormDetails] = useState({
    startDate: "",
    endDate: "",
    posterEmail: "",
    status: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [projectMembers, setProjectMembers] = useState([]);
  const actions = getActions(cookie.USER.role, project?.status)

  const handleDeleteDisbursement = async (e, disbursementId) => {
    try {
      const response = await deleteDisbursement(token, disbursementId);
      if (response.status === "Success") {
        setError("Successfully deleted disbursement");
      } else {
        setError(
          "Failed to delete. You are not authorized to delete this disbursement."
        );
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      setError(`Failed to delete: ${error.message}`);
    }
  };

  const handleExportToExcel = async (e) => {
    e.preventDefault();
    try {
      const blob = await getExcelSheet(token, `disbursements/${projectId}`);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      // may have to come back to reset this filename
      a.download = "export.xlsx";
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

  const handleStatusChange = async (event) => {
    setLoading(true);
    const value = event?.target?.value;
    try {
      let response;
      switch (value) {
        // First case may be dormant if subadmin cannot terminate project
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
      if (response.status !== "Success") {
        setLoading(false)
        console.error(
          "Error in calling update project status inside project details area"
        );
      } else {
        // Update the local state to reflect the new status
        setProjectStatus(value);
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.error("Failed to update:", error);
    }
  };

  const handleEditModalOpen = (e, modalId) => {
    e.stopPropagation();
    setActiveEditModal(modalId === activeEditModal ? null : modalId);
    setShouldShowDetailsEditArea(false);
  };

  const handleEditModalClose = (e, isInsideClick, modalType, action) => {
    const modalRef = modalRefs[modalType]?.current;
    if (isInsideClick) {
      setEditArea(action);
      setActiveEditModal(null);
      setShouldShowDetailsEditArea(true);
    } else {
      // To further ensure that this block only handles outside clicks
      // when modalRef is defined, considering that the first
      // if/else in handleClickOutside will actually listen for
      // all manner of outside-modal clicks. So this is just a 2F check.
      if (modalRef && !modalRef.contains(e.target)) {
        setActiveEditModal(null);
        setShouldShowDetailsEditArea(false);
      }
    }
  };

  const handleFilterValueChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmitRemark = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const remark = e.target.elements.remark.value;
    if (!remark) return;
    try {
      const response = await postRemark(token, { projectId: projectId, text: remark });
      if (response.status === "Success") {
        setLoading(false);
        setError("Posted Remark");
      } else {
        setLoading(false);
        setError("Failed to submit remark.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to submit remark:", error);
      setError(`Failed to submit remark: ${error.message}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isClickOutsideModals = Object.values(modalRefs).every(
        (ref) => !ref.current || !ref.current.contains(e.target)
      );
      const isClickOutsideDetailsEditArea =
        detailsEditAreaRef.current &&
        !detailsEditAreaRef.current.contains(e.target);
      if (!detailsEditAreaRef.current && isClickOutsideModals) {
        handleEditModalClose(e, false, activeEditModal, null);
      }
      if (isClickOutsideModals && isClickOutsideDetailsEditArea) {
        handleEditModalClose(e, false, activeEditModal, null);
        setShouldShowDetailsEditArea(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  useEffect(() => {
    getProject(token, projectId)
      .then((project) => {
        setProject(project);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [projectId, token, shouldShowDetailsEditArea, error, loading]);

  useEffect(() => {
    getFilteredDisbursements(token, projectId, formDetails).then((requests) =>
      setRequests(requests)
    );
  }, [token, projectId, formDetails, error]);

  useEffect(() => {
    setProjectStatus(project?.status);
  }, [project?.status]);

  useEffect(() => {
    getProjectMembers(token, projectId)
      .then((data) => setProjectMembers(data.map((member) => member.email)))
      .catch((err) => {
        console.error("Failed to fetch project members:", err);
        setError("Failed to fetch project members. Please try again later.");
      });
  }, [token, projectId]);

  if (loading) {
    return (
      <Layout>
        <ProjectDetailsAreaWrapper>
          <Jumbotron />
          <H1>Loading...</H1>
        </ProjectDetailsAreaWrapper>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <ProjectDetailsAreaWrapper>
          <Jumbotron />
          <H1>Project not found</H1>
          <P>
            We couldn't find the project you were looking for. Please check the
            URL or try again later.
          </P>
        </ProjectDetailsAreaWrapper>
      </Layout>
    );
  }

  return (
    <Layout>
      <ProjectDetailsAreaWrapper>
        {shouldShowDetailsEditArea && (
          <DetailsEditArea
            ref={detailsEditAreaRef}
            modalId={editArea}
            project={project}
          />
        )}
        <Jumbotron entity={project?.organization} />
        <Row tocolumn={1}>
          <ProjectDetailCardWrapper>
            <ProjectDetailActionRow>
              <InitiativeIcon />
              <Row
                style={{
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ height: "fit-content", cursor: "pointer" }}>
                  <SelectFieldWrapper
                    as="select"
                    name="projectStatus"
                    value={
                      cookie.USER.role === "Individual"
                        ? `Status: ${projectStatus}`
                        : "Update Status"
                    }
                    onChange={handleStatusChange}
                    disabled={cookie.USER.role === "Individual"}
                    style={{
                      appearance:
                        cookie.USER.role === "Individual" ? "none" : "auto",
                      MozAppearance:
                        cookie.USER.role === "Individual" ? "none" : "auto",
                      WebkitAppearance:
                        cookie.USER.role === "Individual" ? "none" : "auto",
                    }}
                  >
                    <option value="Ongoing">Status: {projectStatus}</option>
                    {actions.map((status, key) => (
                      <option key={key} value={status}>
                        {status}
                      </option>
                    ))}
                  </SelectFieldWrapper>
                </div>
                <div
                  style={{
                    backgroundColor:
                      projectStatus === "Closed"
                        ? "green"
                        : projectStatus === "Ongoing"
                          ? "yellow"
                          : "red",
                    padding: "0.5rem",
                    borderRadius: "8px",
                  }}
                ></div>
                {cookie.USER.role === "SubAdmin" && (
                  <i
                    className="fa-solid fa-ellipsis-vertical pad-up"
                    style={{ padding: "0.5rem", cursor: "pointer" }}
                    onClick={(e) => handleEditModalOpen(e, "basic")}
                  />
                )}
                <ProjectDetailEditModal
                  ref={modalRefs.basic}
                  display={activeEditModal === "basic" ? "block" : "none"}
                >
                  <P onClick={(e) => handleEditModalClose(e, true, "basic", "basic")}>
                    Edit Basic Details
                  </P>
                  <P
                    onClick={(e) => handleEditModalClose(e, true, "basic", "members")}
                  >
                    Edit Project Members
                  </P>
                </ProjectDetailEditModal>
              </Row>
            </ProjectDetailActionRow>
            <H3>{`${project?.projectTitle}(${project?.projectSerialNo})`}</H3>
            <P>{`Loan Number: ${project?.fundingSources.map(
              (fundingSource) => ` ${fundingSource.loanNo}`
            )}`}</P>
            <P>{`MDA: ${project?.organization}`}</P>
            <P>{`Tier of Government: ${project?.governmentTier}`}</P>
            <P>{`Effective Date: ${project?.dateEffective}`}</P>
            {project?.dateUpdated && projectStatus !== "Ongoing" && (
              <P>{`Closing Date: ${project?.dateUpdated}`}</P>
            )}
            <P>{`Description: ${project?.description}`}</P>
          </ProjectDetailCardWrapper>
          {project?.beneficiaries && (
            <ProjectDetailCardWrapper>
              <ProjectDetailActionRow>
                <H3>Benefiting Institutions</H3>
                {cookie.USER.role === "SubAdmin" && (
                  <i
                    className="fa-solid fa-ellipsis-vertical pad-up"
                    style={{ padding: "0.5rem", cursor: "pointer" }}
                    onClick={(e) => handleEditModalOpen(e, "beneficiaries")}
                  />
                )}
                <ProjectDetailEditModal
                  ref={modalRefs.beneficiaries}
                  display={
                    activeEditModal === "beneficiaries" ? "block" : "none"
                  }
                >
                  <P
                    onClick={(e) =>
                      handleEditModalClose(
                        e,
                        true,
                        "beneficiaries",
                        "beneficiaries"
                      )
                    }
                  >
                    Edit Beneficiaries List
                  </P>
                </ProjectDetailEditModal>
              </ProjectDetailActionRow>
              <ul>
                {project?.beneficiaries.map((beneficiary, key) => (
                  <Li key={key}>{beneficiary?.name}</Li>
                ))}
              </ul>
            </ProjectDetailCardWrapper>
          )}
        </Row>
        <Row tocolumn={1}>
          <ProjectDetailCardWrapper>
            <ProjectDetailActionRow>
              <FundingSourceIcon />
              {cookie.USER.role === "SubAdmin" && (
                <i
                  className="fa-solid fa-ellipsis-vertical pad-up"
                  style={{ padding: "0.5rem", cursor: "pointer" }}
                  onClick={(e) => handleEditModalOpen(e, "funding")}
                />
              )}
              <ProjectDetailEditModal
                ref={modalRefs.funding}
                display={activeEditModal === "funding" ? "block" : "none"}
              >
                <P
                  onClick={(e) =>
                    handleEditModalClose(e, true, "funding", "funding")
                  }
                >
                  Edit Funding Sources
                </P>
              </ProjectDetailEditModal>
            </ProjectDetailActionRow>
            <H3>Funding Source and Amount</H3>
            <ul>
              {project?.fundingSources?.map((source, key) => (
                <Li key={key}>
                  {source.funder}:{" "}
                  <span>
                    {source.currencySymbol}
                    {new Intl.NumberFormat().format(source.amount)}
                  </span>
                </Li>
              ))}
            </ul>
          </ProjectDetailCardWrapper>
          <BarChart
            axis={"y"}
            title={"Allocated Currencies Metrics"}
            barThickness={10}
            labels={Array.from(
              new Set(
                project?.allocations?.map(
                  (allocation) => allocation.currencyName
                )
              )
            )}
            datasets={(() => {
              const allocations = project?.allocations || [];
              // Create a set of unique currency names
              const currencySet = new Set(
                allocations.map((allocation) => allocation.currencyName)
              );
              const uniqueCurrencies = Array.from(currencySet);
              const datasets = [
                {
                  label: "Amount Disbursed",
                  data: uniqueCurrencies.map(
                    (currency) =>
                      allocations.find(
                        (allocation) => allocation.currencyName === currency
                      )?.amountDisbursed || 0
                  ),
                  backgroundColor: "#059212",
                },
                {
                  label: "Balance",
                  data: uniqueCurrencies.map((currency) => {
                    const allocation = allocations.find(
                      (allocation) => allocation.currencyName === currency
                    );
                    return allocation
                      ? allocation.amountAllocated - allocation.amountDisbursed
                      : 0;
                  }),
                  backgroundColor: "#E9ECF1",
                },
              ];
              return datasets;
            })()}
          />
        </Row>
        <H2>Disbursements</H2>
        <div style={{ overflow: "auto" }}>
          <Table
            location={"detailsArea"}
            columnTitles={columns}
            rowItems={requests}
            uniqueCurrencies={currencies}
            onSelectOption={(x, y, event) => event.preventDefault()}
            performAction={handleDeleteDisbursement}
            role={cookie.USER.role}
            exportToExcel={handleExportToExcel}
            status={status}
            postersId={projectMembers}
            handleFilterValueChange={handleFilterValueChange}
          />
        </div>
        {cookie.USER.role === "Individual" && (
          <ProjectDetailBaseButton
            onClick={() => navigate(`/${entity}/${projectId}/request`)}
          >
            Post a disbursement
          </ProjectDetailBaseButton>
        )}

        <ProjectDetailCardWrapper>
          <H2>Remarks</H2>
          <Column>
            {project.remarks.map((remark, index) => {
              return (
                <Column key={index} style={{ gap: "calc(var(--flexGap)/4)" }} >
                  <P style={{ marginBlock: 0, color: "#059212" }}>{remark.text}</P>
                  <Column style={{ fontStyle: "italic", gap: "calc(var(--flexGap)/4)" }}>
                    <P style={{ marginBlock: 0 }}>{remark.creator}</P>
                    <P style={{ marginBlock: 0 }}>{remark.dateCreated}</P>
                  </Column>
                </Column>
              )
            })}
          </Column>
          {(cookie.USER.role === "SubAdmin" ||
            cookie.USER.role === "SuperAdmin") && (
              <form onSubmit={handleSubmitRemark}>
                <TextAreaWrapper
                  name="remark"
                  placeholder="Enter your remark here"
                  style={{
                    border: "1.5px solid",
                    marginBlock: "var(--sectionMargin)",
                  }}
                />
                <BaseButton type="submit">
                  {loading ? (
                    <DotLoader size={20} color="white" className="dotLoader" />
                  ) : (
                    "Submit Remark"
                  )}
                </BaseButton>
              </form>
            )}
        </ProjectDetailCardWrapper>
        {error && <P style={{ color: "red" }}>{error}</P>}
      </ProjectDetailsAreaWrapper>
    </Layout>
  );
};
