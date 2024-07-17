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
import { getAllOrganizations } from "../../util/apis/getAllOrganizations";
import { getCurrencies } from "../../util/apis/getCurrencies";

export const ProjectRegistrationArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [organizations, setOrganizations] = useState([]);
    const [currencies, setCurrencies] = useState([]);

    //set formDetails initial value and show data type
    const [formDetails, setFormDetails] = useState({
        projectTitle: "",
        description: "",
        organization: "",
        fundingSources: [{ funderName: "", amount: 0, currency: "" }],
        milestones: [{ text: "", startDate: "", endDate: "" }],
        budget: [{ name: "", category: "", amount: 0, currency: "" }],
        contractorDetails: {
            name: "",
            address: "",
            phoneNumber: "",
            email: "",
            companyName: "",
            companyAddress: "",
            companyPhoneNumber: "",
            companyEmail: "",
            registrationDate: "",
            registrationNo: "",
            bankName: "",
            accountNumber: "",
            accountType: ""
        }
    });

    useEffect(() => {
        getAllOrganizations(token).then((listOfOrganizations) => setOrganizations(listOfOrganizations));
    }, [token]);

    useEffect(() => {
        getCurrencies(token).then((data) => setCurrencies(data));
    }, [token]);

    // controller added to input fields to handle change
    // depending on if the field name is delimited
    const handleChange = (event) => {
        const { name, value } = event.target;
        const [section, field] = name.split('.');
        if (field) {
            setFormDetails((prevDetails) => ({
                ...prevDetails,
                [section]: {
                    ...prevDetails[section],
                    [field]: value
                }
            }));
        } else {
            setFormDetails((prevDetails) => ({
                ...prevDetails,
                [name]: value
            }));
        }
    };

    // controller to handle change in nested input fields of the form 
    // (eg. fundingSources: {}[])
    const handleNestedChange = (section, index, event) => {
        const { name, value } = event.target;
        // Here, we want to get the section that this field is nested in
        // using the section argument that is passed in the jsx and using
        // the entry index that is also passed in jsx, we update 
        // that specific entry with latest changes in concerned input field.
        const updatedSection = formDetails[section].map((entry, i) => (
            i === index ? { ...entry, [name]: value } : entry
        ));

        // Here, we update form details with updated section from above
        setFormDetails((prevDetails) => ({
            ...prevDetails,
            [section]: updatedSection
        }));
    };

    // function to add new entry fields to a section
    const handleAddNewEntry = (section) => {
        const newItem = section === 'fundingSources'
            ? { funderName: "", amount: 0, currency: "" }
            : section === 'milestones'
                ? { text: "", startDate: "", endDate: "" }
                : { name: "", category: "", amount: 0, currency: "" };

        setFormDetails((prevDetails) => ({
            ...prevDetails,
            [section]: [...prevDetails[section], newItem]
        }));
    };

    // function to remove entry fields from a section
    const handleRemoveEntry = (section, index) => {
        const updatedSection = formDetails[section].filter((_, i) => i !== index);
        setFormDetails((prevDetails) => ({
            ...prevDetails,
            [section]: updatedSection
        }));
    };

    // handle form submission by sending form details to backend.
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addProject(token, formDetails);
            if (response.status === "Success") {
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
                        type="text"
                        name="projectTitle"
                        required
                        value={formDetails.projectTitle}
                        onChange={handleChange}
                    />
                    <Label htmlFor="description">Description</Label>
                    <TextAreaWrapper
                        name="description"
                        value={formDetails.description}
                        onChange={handleChange}
                    />
                    <Label htmlFor="organization">Organization</Label>
                    <SelectFieldWrapper
                        name="organization"
                        value={formDetails.organization}
                        onChange={handleChange}
                    >
                        <option value="">Select your Organisation</option>
                        {organizations.flatMap(organization =>
                            organization.subOrganizations.filter(subOrganization => subOrganization.orgType === "Parastatal")
                        ).map((subOrganization, key) => (
                            <option key={key} value={subOrganization.name}>
                                {subOrganization.name}
                            </option>
                        ))}
                    </SelectFieldWrapper>
                    <Label htmlFor="fundingSources">Funding Sources</Label>
                    {formDetails.fundingSources.map((source, index) => (
                        <ProjectRegistrationBaseInputWrapper key={index}>
                            <ProjectRegistrationBaseInput
                                type="text"
                                name="funderName"
                                placeholder="Funder Name"
                                required
                                value={source.funderName}
                                onChange={(e) => handleNestedChange('fundingSources', index, e)}
                            />
                            <ProjectRegistrationBaseInput
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                required
                                value={source.amount}
                                onChange={(e) => handleNestedChange('fundingSources', index, e)}
                            />
                            <SelectFieldWrapper
                                name="currency"
                                required
                                value={source.currency}
                                onChange={(e) => handleNestedChange('fundingSources', index, e)}
                            >
                                <option value="">Select a currency</option>
                                {currencies.map((currency, key) => (
                                    <option key={key} value={currency.name}>
                                        {currency.name}
                                    </option>
                                ))}
                            </SelectFieldWrapper>
                            <ProjectRegistrationBaseButton type="button" onClick={() => handleRemoveEntry('fundingSources', index)}>-</ProjectRegistrationBaseButton>
                        </ProjectRegistrationBaseInputWrapper>
                    ))}
                    <ProjectRegistrationBaseButton type="button" onClick={() => handleAddNewEntry('fundingSources')}>Add New Entry</ProjectRegistrationBaseButton>
                    <Label htmlFor="milestones">Timeline Milestones</Label>
                    {formDetails.milestones.map((milestone, index) => (
                        <ProjectRegistrationBaseInputWrapper key={index}>
                            <ProjectRegistrationBaseInput
                                type="text"
                                name="text"
                                placeholder="Milestone"
                                required
                                value={milestone.text}
                                onChange={(e) => handleNestedChange('milestones', index, e)}
                            />
                            <ProjectRegistrationBaseInput
                                type="date"
                                name="startDate"
                                placeholder="Start Date"
                                required
                                value={milestone.startDate}
                                onChange={(e) => handleNestedChange('milestones', index, e)}
                            />
                            <ProjectRegistrationBaseInput
                                type="date"
                                name="endDate"
                                placeholder="End Date"
                                required
                                value={milestone.endDate}
                                onChange={(e) => handleNestedChange('milestones', index, e)}
                            />
                            <ProjectRegistrationBaseButton type="button" onClick={() => handleRemoveEntry('milestones', index)}>-</ProjectRegistrationBaseButton>
                        </ProjectRegistrationBaseInputWrapper>
                    ))}
                    <ProjectRegistrationBaseButton type="button" onClick={() => handleAddNewEntry('milestones')}>Add New Entry</ProjectRegistrationBaseButton>
                    <Label htmlFor="budget">Budget Information</Label>
                    {formDetails.budget.map((budgetItem, index) => (
                        <ProjectRegistrationBaseInputWrapper key={index}>
                            <ProjectRegistrationBaseInput
                                type="text"
                                name="name"
                                placeholder="Description"
                                required
                                value={budgetItem.name}
                                onChange={(e) => handleNestedChange('budget', index, e)}
                            />
                            <ProjectRegistrationBaseInput
                                type="text"
                                name="category"
                                placeholder="Category"
                                required
                                value={budgetItem.category}
                                onChange={(e) => handleNestedChange('budget', index, e)}
                            />
                            <ProjectRegistrationBaseInput
                                type="number"
                                name="amount"
                                placeholder="Amount"
                                required
                                value={budgetItem.amount}
                                onChange={(e) => handleNestedChange('budget', index, e)}
                            />
                            <SelectFieldWrapper
                                name="currency"
                                required
                                value={budgetItem.currency}
                                onChange={(e) => handleNestedChange('budget', index, e)}
                            >
                                <option value="">Select a currency</option>
                                {currencies.map((currency, key) => (
                                    <option key={key} value={currency.name}>
                                        {currency.name}
                                    </option>
                                ))}
                            </SelectFieldWrapper>
                            <ProjectRegistrationBaseButton type="button" onClick={() => handleRemoveEntry('budget', index)}>-</ProjectRegistrationBaseButton>
                        </ProjectRegistrationBaseInputWrapper>
                    ))}
                    <ProjectRegistrationBaseButton type="button" onClick={() => handleAddNewEntry('budget')}>Add New Entry</ProjectRegistrationBaseButton>
                    <Label htmlFor="contractorDetails.name">Contractor Details</Label>
                    <BaseInputWrapper
                        type="text"
                        name="contractorDetails.name"
                        placeholder="Name"
                        required
                        value={formDetails.contractorDetails.name}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="text"
                        name="contractorDetails.address"
                        placeholder="Address"
                        required
                        value={formDetails.contractorDetails.address}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="tel"
                        name="contractorDetails.phoneNumber"
                        placeholder="Phone Number"
                        required
                        value={formDetails.contractorDetails.phoneNumber}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="email"
                        name="contractorDetails.email"
                        placeholder="Email"
                        required
                        value={formDetails.contractorDetails.email}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="text"
                        name="contractorDetails.companyName"
                        placeholder="Company Name"
                        required
                        value={formDetails.contractorDetails.companyName}
                        onChange={handleChange}
                    />
                    <TextAreaWrapper
                        name="contractorDetails.companyAddress"
                        placeholder="Company Address"
                        value={formDetails.contractorDetails.companyAddress}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="tel"
                        name="contractorDetails.companyPhoneNumber"
                        placeholder="Company Phone Number"
                        required
                        value={formDetails.contractorDetails.companyPhoneNumber}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="email"
                        name="contractorDetails.companyEmail"
                        placeholder="Company Email"
                        required
                        value={formDetails.contractorDetails.companyEmail}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="date"
                        name="contractorDetails.registrationDate"
                        placeholder="Registration Date"
                        required
                        value={formDetails.contractorDetails.registrationDate}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="text"
                        name="contractorDetails.bankName"
                        placeholder="Bank Name"
                        required
                        value={formDetails.contractorDetails.bankName}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="text"
                        name="contractorDetails.accountNumber"
                        placeholder="Account Number"
                        required
                        value={formDetails.contractorDetails.accountNumber}
                        onChange={handleChange}
                    />
                    <BaseInputWrapper
                        type="text"
                        name="contractorDetails.accountType"
                        placeholder="Account Type"
                        required
                        value={formDetails.contractorDetails.accountType}
                        onChange={handleChange}
                    />
                    <BaseButton type="submit">Continue</BaseButton>
                </form>
                {error && <P style={{ color: 'red' }}>{error}</P>}
            </ProjectRegistrationAreaWrapper>
        </Dashboard>
    );
};
