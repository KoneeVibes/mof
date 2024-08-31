import { useEffect, useState } from "react";
import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
import { Layout } from "../layout";
import {
  ProjectRegistrationAreaWrapper,
  ProjectRegistrationBaseInputWrapper,
  ProjectRegistrationBaseInput,
  ProjectRegistrationBaseButton,
} from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { addProject } from "../../util/apis/addProject";
import { BaseButton } from "../../components/buttons/styled";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { getCurrencies } from "../../util/apis/getCurrencies";
import { DotLoader } from "react-spinners";
import { getOrganizationMembers } from "../../util/apis/getOrganizationMembers";
import { getFundingSources } from "../../util/apis/getFundingSources";

export const tiersOfGovernment = ["Federal", "State", "LGA"];
export const ProjectRegistrationArea = () => {
  const cookies = new Cookies();
  const cookie = cookies.getAll();
  const token = cookies.get("TOKEN");
  const { organizationId } = cookie.USER;
  const creditTypes = ["Loan", "Grant", "Loan/Grant"];

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [fundingSources, setFundingSources] = useState([]);
  const [members, setMembers] = useState([]);

    const [formDetails, setFormDetails] = useState({
        projectTitle: "",
        description: "",
        startDate: "",
        endDate: "",
        governmentTier: "",
        fundingSources: [{ funderName: "", amount: 0, currencyName: "" }],
        projectMembers: [{ email: "" }],
        beneficiaries: [{ name: "" }]
    });

  useEffect(() => {
    getFundingSources(token)
      .then((data) => setFundingSources(data))
      .catch((err) => {
        console.error("Failed to fetch funding sources:", err);
        setError("Failed to fetch funding sources. Please try again later.");
      });
  }, [token]);

  useEffect(() => {
    getCurrencies(token)
      .then((data) => setCurrencies(data))
      .catch((err) => {
        console.error("Failed to fetch currencies:", err);
        setError("Failed to fetch currencies. Please try again later.");
      });
  }, [token]);

  useEffect(() => {
    getOrganizationMembers(token, organizationId)
      .then((data) => setMembers(data))
      .catch((err) => {
        console.error("Failed to fetch project members:", err);
        setError("Failed to fetch project members. Please try again later.");
      });
  }, [organizationId, token]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleNestedChange = (section, index, event) => {
    const { name, value } = event.target;
    const updatedSection = formDetails[section].map((entry, i) =>
      i === index ? { ...entry, [name]: value } : entry
    );

    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [section]: updatedSection,
    }));
  };

  const handleAddNewEntry = (section) => {
    const newItem =
      section === "fundingSources"
        ? { funderName: "", amount: 0, currencyName: "" }
        : section === "projectMembers"
        ? { email: "" }
        : section === "beneficiaries"
        ? { name: "" }
        : null;

    if (newItem) {
      setFormDetails((prevDetails) => ({
        ...prevDetails,
        [section]: [...prevDetails[section], newItem],
      }));
    }
  };

  const handleRemoveEntry = (section, index) => {
    const updatedSection = formDetails[section].filter((_, i) => i !== index);
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [section]: updatedSection,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDetails);
    setError(null);
    setLoading(true);
    try {
      const response = await addProject(token, formDetails);
      if (response.status === "Success") {
        setLoading(false);
        navigate("/dashboard");
      } else {
        setLoading(false);
        setError("Submission failed. Please check your inputs and try again.");
      }
    } catch (error) {
      setLoading(false);
      setError(`Submission failed. ${error.message}`);
      console.error("Submission failed:", error);
    }
  };

  return (
    <Layout>
      <ProjectRegistrationAreaWrapper>
        <H2>PROJECT DETAILS</H2>
        <P>PLEASE ENTER THE PROJECT INFORMATION</P>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="projectTitle">Project Title</Label>
          <BaseInputWrapper
            as="input"
            type="text"
            name="projectTitle"
            required
            value={formDetails.projectTitle}
            onChange={handleChange}
          />
          <Label htmlFor="description">Description</Label>
          <TextAreaWrapper
            as="textarea"
            name="description"
            value={formDetails.description}
            onChange={handleChange}
          />

                    <Label htmlFor="">Effective Start and End Date and Tier of Government</Label>
                    <ProjectRegistrationBaseInputWrapper>
                        <BaseInputWrapper
                            as="input"
                            type="date"
                            name="startDate"
                            required
                            value={formDetails.startDate}
                            onChange={handleChange}
                        />
                        <BaseInputWrapper
                            as="input"
                            type="date"
                            name="endDate"
                            required
                            value={formDetails.endDate}
                            onChange={handleChange}
                        />
                        <SelectFieldWrapper
                            as="select"
                            name="governmentTier"
                            required
                            value={formDetails.governmentTier}
                            onChange={handleChange}
                        >
                            <option value="">Select a government tier</option>
                            {tiersOfGovernment.map((tier, key) => (
                                <option key={key} value={tier}>
                                    {tier}
                                </option>
                            ))}
                        </SelectFieldWrapper>
                    </ProjectRegistrationBaseInputWrapper>

          <Label>Funding Sources</Label>
          {formDetails?.fundingSources?.map((source, index) => (
            <ProjectRegistrationBaseInputWrapper key={index}>
              <SelectFieldWrapper
                as="select"
                name="funderName"
                required
                value={source.funderName}
                onChange={(e) => handleNestedChange("fundingSources", index, e)}
              >
                <option value="">Select a funding source</option>
                {fundingSources.map((fundingSource, key) => (
                  <option key={key} value={fundingSource.name}>
                    {fundingSource.name}
                  </option>
                ))}
              </SelectFieldWrapper>
              <ProjectRegistrationBaseInput
                type="number"
                name="amount"
                placeholder="Amount"
                required
                value={source.amount}
                onChange={(e) => handleNestedChange("fundingSources", index, e)}
              />
              <SelectFieldWrapper
                as="select"
                name="currencyName"
                required
                value={source.currencyName}
                onChange={(e) => handleNestedChange("fundingSources", index, e)}
              >
                <option value="">Select a currency</option>
                {currencies.map((currency, key) => (
                  <option key={key} value={currency.name}>
                    {currency.name}
                  </option>
                ))}
              </SelectFieldWrapper>
              <ProjectRegistrationBaseInput
                type="string"
                name="loanNo"
                placeholder=" Enter loan number"
                required
                value={source.loanNumber}
                onChange={(e) => handleNestedChange("fundingSources", index, e)}
              />
              <ProjectRegistrationBaseInput
                type="string"
                name="creditNo"
                placeholder="Enter credit number"
                required
                value={source.creditNumber}
                onChange={(e) => handleNestedChange("fundingSources", index, e)}
              />
              <SelectFieldWrapper
                as="select"
                name="creditType"
                required
                value={source.creditType}
                onChange={(e) => handleNestedChange("fundingSources", index, e)}
              >
                <option value="">Select a credit type</option>
                {creditTypes.map((creditType, index) => {
                  return (
                    <option key={index} value={creditType}>
                      {creditType}
                    </option>
                  );
                })}
              </SelectFieldWrapper>

              <ProjectRegistrationBaseButton
                type="button"
                onClick={() => handleRemoveEntry("fundingSources", index)}
              >
                -
              </ProjectRegistrationBaseButton>
            </ProjectRegistrationBaseInputWrapper>
          ))}
          <ProjectRegistrationBaseButton
            type="button"
            onClick={() => handleAddNewEntry("fundingSources")}
          >
            Add New Entry
          </ProjectRegistrationBaseButton>

          <Label>Project Members</Label>
          {formDetails?.projectMembers?.map((member, index) => (
            <ProjectRegistrationBaseInputWrapper key={index}>
              <SelectFieldWrapper
                as="select"
                name="email"
                required
                value={member.email}
                onChange={(e) => handleNestedChange("projectMembers", index, e)}
              >
                <option value="">Select a member of your MDA</option>
                {members.map((member, key) => (
                  <option key={key} value={member.email}>
                    {member.email}
                  </option>
                ))}
              </SelectFieldWrapper>
              <ProjectRegistrationBaseButton
                type="button"
                onClick={() => handleRemoveEntry("projectMembers", index)}
              >
                -
              </ProjectRegistrationBaseButton>
            </ProjectRegistrationBaseInputWrapper>
          ))}
          <ProjectRegistrationBaseButton
            type="button"
            onClick={() => handleAddNewEntry("projectMembers")}
          >
            Add New Entry
          </ProjectRegistrationBaseButton>

          <Label>Beneficiaries</Label>
          {formDetails?.beneficiaries?.map((beneficiary, index) => (
            <ProjectRegistrationBaseInputWrapper key={index}>
              <ProjectRegistrationBaseInput
                type="string"
                name="name"
                placeholder="Enter Beneficiary Name"
                value={beneficiary.name}
                onChange={(e) => handleNestedChange("beneficiaries", index, e)}
              />
              <ProjectRegistrationBaseButton
                type="button"
                onClick={() => handleRemoveEntry("beneficiaries", index)}
              >
                -
              </ProjectRegistrationBaseButton>
            </ProjectRegistrationBaseInputWrapper>
          ))}
          <ProjectRegistrationBaseButton
            type="button"
            onClick={() => handleAddNewEntry("beneficiaries")}
          >
            Add New Entry
          </ProjectRegistrationBaseButton>

          <BaseButton type="submit">
            {loading ? (
              <DotLoader size={20} color="white" className="dotLoader" />
            ) : (
              "Continue"
            )}
          </BaseButton>
        </form>
        {error && <P style={{ color: "red" }}>{error}</P>}
      </ProjectRegistrationAreaWrapper>
    </Layout>
  );
};
