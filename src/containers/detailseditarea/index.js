import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Label, P } from "../../components/typography/styled";
import { DetailsEditAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { ProjectRegistrationBaseButton } from "../projectregistrationarea/styled";
import { BaseButton } from "../../components/buttons";
import { DotLoader } from "react-spinners";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { creditTypes, tiersOfGovernment } from "../projectregistrationarea";
import { BASE_ENDPOINT } from "../../util/endpoint";
import Cookies from "universal-cookie";
import { formatDateToYYYYMMDD } from "../../config/formatDateToYYYYMMDD";
import { getFundingSources } from "../../util/apis/getFundingSources";
import { getCurrencies } from "../../util/apis/getCurrencies";
import { toTitleCase } from "../../config/formatCase";
import { getOrganizationMembers } from "../../util/apis/getOrganizationMembers";

export const DetailsEditArea = React.forwardRef((props, ref) => {
    const { modalId, project } = props;
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({});
    const [currencies, setCurrencies] = useState([]);
    const [fundingSources, setFundingSources] = useState([]);
    const [organizationMembers, setOrganizationMembers] = useState([]);
    const [error, setError] = useState(null);

    const memoizedFormDetails = useMemo(() => {
        let initialDetails = {};
        switch (modalId) {
            case "basic":
                initialDetails = {
                    projectTitle: project?.projectTitle || "",
                    description: project?.description || "",
                    dateEffective: formatDateToYYYYMMDD(project?.dateEffective) || "",
                    governmentTier: project?.governmentTier || "",
                };
                break;
            case "members":
                initialDetails = {
                    members: project?.team.map((member) => ({ email: member.email })) || [{ email: "" }],
                }
                break;
            case "beneficiaries":
                initialDetails = {
                    beneficiaries: project?.beneficiaries || [{ name: "" }],
                };
                break;
            case "funding":
                initialDetails = {
                    fundingSources: project?.fundingSources.map((fundingSource) => ({
                        funderName: fundingSource.funder,
                        amount: fundingSource.amount,
                        currencyName: fundingSource.currencyName,
                        creditNo: fundingSource.creditNo,
                        creditType: fundingSource.creditType,
                        loanNo: fundingSource.loanNo
                    })) || [{ funderName: "", amount: 0, currencyName: "", creditNo: "", creditType: "", loanNo: "" }],
                };
                break;
            default:
                return {};
        }
        return initialDetails;
    }, [modalId, project]);

    useEffect(() => {
        setFormDetails(memoizedFormDetails);
    }, [memoizedFormDetails]);

    useEffect(() => {
        getFundingSources(token)
            .then((data) => setFundingSources(data))
            .catch((err) => {
                console.error("Failed to fetch funding sources:", err);
                setError("Failed to fetch funding sources. Please try again later.");
            });
    }, [token]);

    useEffect(() => {
        getOrganizationMembers(token, project.organizationId)
            .then((data) => setOrganizationMembers(data))
            .catch((err) => {
                console.error("Failed to fetch organization members:", err);
                setError("Failed to fetch organization members. Please try again later.");
            });
    }, [token, project.organizationId]);

    useEffect(() => {
        getCurrencies(token)
            .then((data) => setCurrencies(data))
            .catch((err) => {
                console.error("Failed to fetch currencies:", err);
                setError("Failed to fetch currencies. Please try again later.");
            });
    }, [token]);

    const handleChange = useCallback((event) => {
        const { name, value } = event.target;
        setFormDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    }, []);

    const handleNestedChange = useCallback((section, index, event) => {
        const { name, value } = event.target;
        const updatedSection = formDetails[section]?.map((entry, i) =>
            i === index ? { ...entry, [name]: value } : entry
        );
        setFormDetails(prevDetails => ({
            ...prevDetails,
            [section]: updatedSection,
        }));
    }, [formDetails]);

    const handleAddNewEntry = useCallback((e, section) => {
        e.stopPropagation();
        const newItem =
            section === "fundingSources"
                ? { funderName: "", amount: 0, currencyName: "", creditNo: "", creditType: "", loanNo: "" }
                : section === "beneficiaries"
                    ? { name: "" }
                    : section === "members"
                        ? { email: "" }
                        : null;
        if (newItem) {
            setFormDetails(prevDetails => ({
                ...prevDetails,
                [section]: [...(prevDetails[section] || []), newItem],
            }));
        }
    }, []);

    const handleRemoveEntry = useCallback((e, section, index) => {
        e.stopPropagation();
        setFormDetails(prevDetails => ({
            ...prevDetails,
            [section]: (prevDetails[section] || []).filter((_, i) => i !== index),
        }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let subRoute = '';
            switch (modalId) {
                case "basic":
                    subRoute = 'api/projects/details/edit';
                    break;
                case "members":
                    subRoute = 'api/projects/team';
                    break;
                case "beneficiaries":
                    subRoute = 'api/projects/beneficiaries';
                    break;
                case "funding":
                    subRoute = 'api/projects/fundings';
                    break;
                default:
                    throw new Error('Invalid modalId');
            }
            const response = await fetch(`${BASE_ENDPOINT}/${subRoute}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formDetails, projectId: project.projectId }),
            });
            const res = await response.json();
            if (!response.ok) {
                setLoading(false);
                setError(`Update failed, ${res.title}`);
                throw new Error(`${res.title}`);
            }
            setLoading(false);
            setError(`${res.message}`);
        } catch (error) {
            setLoading(false);
            setError(`Update failed. ${error}`);
            console.error('Error submitting form:', error);
        }
    };

    const renderInputs = () => {
        switch (modalId) {
            case "basic":
                return Object.entries(formDetails).map(([key, value], index) => (
                    <React.Fragment key={index}>
                        <Label>{toTitleCase(key.replace(/([A-Z])/g, ' $1').trim())}</Label>
                        {(key === "governmentTier") ?
                            <SelectFieldWrapper
                                as="select"
                                name={key}
                                required
                                value={value || ""}
                                onChange={handleChange}
                            >
                                <option value="">Select a government tier</option>
                                {tiersOfGovernment.map((tier, key) => (
                                    <option key={key} value={tier}>
                                        {tier}
                                    </option>
                                ))}
                            </SelectFieldWrapper>
                            :
                            <BaseInputWrapper
                                as="input"
                                type={(key === "dateEffective") ? "date" : "text"}
                                name={key}
                                value={(key === "dateEffective") ? formatDateToYYYYMMDD(value) : value || ''}
                                onChange={handleChange}
                            />
                        }
                    </React.Fragment>
                ));
            case "members":
            case "funding":
            case "beneficiaries":
                const isMembers = modalId === "members";
                const section = isMembers ? "members" : modalId === "funding" ? "fundingSources" : "beneficiaries";
                const labelPrefix = isMembers ? "Member" : modalId === "funding" ? "Funding Source" : "Beneficiary";
                return (
                    <>
                        {(formDetails[section] || []).map((item, index) => (
                            <React.Fragment key={index}>
                                <Label>{`${labelPrefix} ${index + 1}`}</Label>
                                {Object.entries(item).map(([field, value], subIndex) => (
                                    <React.Fragment key={subIndex}>
                                        <Label>
                                            {(toTitleCase(field.replace(/([A-Z])/g, ' $1').trim()) === "Credit No")
                                                ? "Credit Number"
                                                : (toTitleCase(field.replace(/([A-Z])/g, ' $1').trim()) === "Loan No")
                                                    ? "Loan Number"
                                                    : toTitleCase(field.replace(/([A-Z])/g, ' $1').trim())}
                                        </Label>
                                        {(field === "funderName" && modalId === "funding") ? (
                                            <SelectFieldWrapper
                                                as="select"
                                                name={field}
                                                required
                                                value={value || ""}
                                                onChange={(e) => handleNestedChange(section, index, e)}
                                            >
                                                <option value="">Select a funding source</option>
                                                {fundingSources.map((fundingSource, key) => (
                                                    <option key={key} value={fundingSource.name}>
                                                        {fundingSource.name}
                                                    </option>
                                                ))}
                                            </SelectFieldWrapper>
                                        ) : (field === "currencyName" && modalId === "funding") ? (
                                            <SelectFieldWrapper
                                                as="select"
                                                name={field}
                                                required
                                                value={value || ""}
                                                onChange={(e) => handleNestedChange(section, index, e)}
                                            >
                                                <option value="">Select a currency</option>
                                                {currencies.map((currency, key) => (
                                                    <option key={key} value={currency.name}>
                                                        {currency.name}
                                                    </option>
                                                ))}
                                            </SelectFieldWrapper>
                                        ) : (field === "creditType" && modalId === "funding") ? (
                                            <SelectFieldWrapper
                                                as="select"
                                                name={field}
                                                required
                                                value={value || ""}
                                                onChange={(e) => handleNestedChange(section, index, e)}
                                            >
                                                <option value="">Select a credit type</option>
                                                {creditTypes.map((creditType, key) => (
                                                    <option key={key} value={creditType}>
                                                        {creditType}
                                                    </option>
                                                ))}
                                            </SelectFieldWrapper>
                                        ) : (isMembers && field === "email") ? (
                                            <SelectFieldWrapper
                                                as="select"
                                                name={field}
                                                required
                                                value={value || ""}
                                                onChange={(e) => handleNestedChange(section, index, e)}
                                            >
                                                <option value="">Select member</option>
                                                {organizationMembers.map((member, key) => (
                                                    <option key={key} value={member.email}>
                                                        {member.email}
                                                    </option>
                                                ))}
                                            </SelectFieldWrapper>
                                        ) : (
                                            // handles beneficiaries form
                                            <BaseInputWrapper
                                                as="input"
                                                type="text"
                                                name={field}
                                                value={value || ''}
                                                onChange={(e) => handleNestedChange(section, index, e)}
                                            />
                                        )}
                                    </React.Fragment>
                                ))}
                                <ProjectRegistrationBaseButton
                                    type="button"
                                    onClick={(e) => handleRemoveEntry(e, section, index)}
                                >
                                    -
                                </ProjectRegistrationBaseButton>
                            </React.Fragment>
                        ))}
                        <ProjectRegistrationBaseButton
                            type="button"
                            onClick={(e) => handleAddNewEntry(e, section)}
                        >
                            Add New Entry
                        </ProjectRegistrationBaseButton>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <DetailsEditAreaWrapper ref={ref}>
            <form onSubmit={handleSubmit}>
                {modalId === "funding" && (
                    <P style={{ color: "red" }}>
                        Editing the project's funding details will result in the forfeiture of all disbursements and the removal of any existing funding records. Click out to cancel.
                    </P>
                )}
                {renderInputs()}
                <BaseButton type="submit">
                    {loading ? (
                        <DotLoader size={20} color="white" className="dotLoader" />
                    ) : (
                        "Save"
                    )}
                </BaseButton>
            </form>
            {error && <P style={{ color: 'red' }}>{error}</P>}
        </DetailsEditAreaWrapper>
    );
});
