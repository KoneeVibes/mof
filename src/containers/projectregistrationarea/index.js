import { useEffect, useState } from "react";
import { TextAreaWrapper } from "../../components/formfields/textarea/styled";
import { Dashboard } from "../dashboard";
import {
    ProjectRegistrationAreaWrapper,
    ProjectRegistrationBaseInputWrapper,
    ProjectRegistrationBaseInput,
    ProjectRegistrationBaseButton
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
import {getOrganizationMembers} from "../../util/apis/getOrganizationMembers";

export const ProjectRegistrationArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookies.get("TOKEN");
    const { organizationId } = cookie.USER;
    console.log(organizationId);

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [members, setMembers] = useState([]);

    const [formDetails, setFormDetails] = useState({
        projectTitle: "",
        description: "",
        fundingSources: [{ funderName: "", amount: 0, currencyName: "" }],
        milestones: [{ text: "" }],
        allocations: [{ amount: 0, currencyName: "" }],
        projectMembers: [{ email: "" }],
    });

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
                console.error("Failed to fetch currencies:", err);
                setError("Failed to fetch currencies. Please try again later.");
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
                : section === "allocations"
                    ? { amount: 0, currencyName: "" }
                    : section === "projectMembers"
                        ? { email: "" }
                        : section === "milestones"
                            ? { text: "" }
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
        setLoading(true);
        console.log(formDetails);
        try {
            const response = await addProject(token, formDetails);
            if (response.status === "Success") {
                setLoading(false);
                navigate("/dashboard");
            } else {
                setError("Submission failed. Please check your inputs and try again.");
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setError("Submission failed. Please check your inputs and try again.");
        }
    };

    return (
        <Dashboard>
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

                    <Label>Funding Sources</Label>
                    {formDetails.fundingSources.map((source, index) => (
                        <ProjectRegistrationBaseInputWrapper key={index}>
                            <ProjectRegistrationBaseInput
                                type="text"
                                name="funderName"
                                placeholder="Funder Name"
                                required
                                value={source.funderName}
                                onChange={(e) => handleNestedChange("fundingSources", index, e)}
                            />
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
                            <ProjectRegistrationBaseButton
                                type="button"
                                onClick={() => handleRemoveEntry("fundingSources", index)}
                            >
                                -
                            </ProjectRegistrationBaseButton>
                        </ProjectRegistrationBaseInputWrapper>
                    ))}
                    <ProjectRegistrationBaseButton type="button" onClick={() => handleAddNewEntry("fundingSources")}>
                        Add New Entry
                    </ProjectRegistrationBaseButton>

                    <Label>Milestones</Label>
                    {formDetails.milestones.map((milestone, index) => (
                        <ProjectRegistrationBaseInputWrapper key={index}>
                            <ProjectRegistrationBaseInput
                                type="text"
                                name="text"
                                placeholder="State Milestone"
                                required
                                value={milestone.text}
                                onChange={(e) => handleNestedChange("milestones", index, e)}
                            />
                            <ProjectRegistrationBaseButton
                                type="button"
                                onClick={() => handleRemoveEntry("milestones", index)}
                            >
                                -
                            </ProjectRegistrationBaseButton>
                        </ProjectRegistrationBaseInputWrapper>
                    ))}
                    <ProjectRegistrationBaseButton type="button" onClick={() => handleAddNewEntry("milestones")}>
                        Add New Entry
                    </ProjectRegistrationBaseButton>

                    <Label>Allocations</Label>
                    {formDetails.allocations.map((allocation, index) => (
                        <ProjectRegistrationBaseInputWrapper key={index}>
                            <ProjectRegistrationBaseInput
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                required
                                value={allocation.amount}
                                onChange={(e) => handleNestedChange("allocations", index, e)}
                            />
                            <SelectFieldWrapper
                                as="select"
                                name="currencyName"
                                required
                                value={allocation.currencyName}
                                onChange={(e) => handleNestedChange("allocations", index, e)}
                            >
                                <option value="">Select a currency</option>
                                {currencies.map((currency, key) => (
                                    <option key={key} value={currency.name}>
                                        {currency.name}
                                    </option>
                                ))}
                            </SelectFieldWrapper>
                            <ProjectRegistrationBaseButton
                                type="button"
                                onClick={() => handleRemoveEntry("allocations", index)}
                            >
                                -
                            </ProjectRegistrationBaseButton>
                        </ProjectRegistrationBaseInputWrapper>
                    ))}
                    <ProjectRegistrationBaseButton type="button" onClick={() => handleAddNewEntry("allocations")}>
                        Add New Entry
                    </ProjectRegistrationBaseButton>

                    <Label>Project Members</Label>
                    {formDetails.projectMembers.map((member, index) => (
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
                    <ProjectRegistrationBaseButton type="button" onClick={() => handleAddNewEntry("projectMembers")}>
                        Add New Entry
                    </ProjectRegistrationBaseButton>

                    <BaseButton type="submit">
                    {loading ?
                            <DotLoader
                                size={20}
                                color="white"
                                className="dotLoader"
                            /> : "Continue"}
                    </BaseButton>
                </form>
                {error && <P style={{ color: "red" }}>{error}</P>}
            </ProjectRegistrationAreaWrapper>
        </Dashboard>
    );
};
