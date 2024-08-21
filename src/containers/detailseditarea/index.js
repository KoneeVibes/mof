import React, { useState, useEffect, useCallback } from "react";
import { Label, P } from "../../components/typography/styled";
import { DetailsEditAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { ProjectRegistrationBaseButton } from "../projectregistrationarea/styled";
import { BaseButton } from "../../components/buttons";
import { DotLoader } from "react-spinners";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { tiersOfGovernment } from "../projectregistrationarea";
import { BASE_ENDPOINT } from "../../util/endpoint";
import Cookies from "universal-cookie";
import { formatDateToYYYYMMDD } from "../../config/formatDateToYYYYMMDD";
import { getFundingSources } from "../../util/apis/getFundingSources";
import { getCurrencies } from "../../util/apis/getCurrencies";
import { toTitleCase } from "../../config/formatCase";

export const DetailsEditArea = React.forwardRef((props, ref) => {
    const { modalId, project } = props;
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({});
    const [currencies, setCurrencies] = useState([]);
    const [fundingSources, setFundingSources] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInitialValues = async () => {
            try {
                let details = {};
                switch (modalId) {
                    case "basic":
                        details = {
                            projectTitle: project?.projectTitle || "",
                            description: project?.description || "",
                            dateEffective: project?.dateEffective || "",
                            governmentTier: project?.governmentTier || "",
                        };
                        break;
                    case "beneficiaries":
                        details = {
                            beneficiaries: project?.beneficiaries || [{ name: "" }],
                        };
                        break;
                    case "funding":
                        details = {
                            fundingSources: project?.fundingSources.map((fundingSource) => ({
                                funderName: fundingSource.funder,
                                amount: fundingSource.amount,
                                currencyName: fundingSource.currencyName
                            })) || [{ funderName: "", amount: 0, currencyName: "" }],
                        };
                        break;
                    default:
                        return;
                }
                setFormDetails(details);
            } catch (error) {
                console.error('Error fetching initial values:', error);
                setFormDetails({});
            }
        };
        fetchInitialValues();
    }, [modalId, project]);

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
                ? { funderName: "", amount: 0, currencyName: "" }
                : section === "beneficiaries"
                    ? { name: "" }
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
            let method = '';
            switch (modalId) {
                case "basic":
                    subRoute = 'api/projects/details/edit';
                    method = 'PATCH'
                    break;
                case "beneficiaries":
                    subRoute = 'api/projects/beneficiaries';
                    method = 'PUT'
                    break;
                case "funding":
                    subRoute = 'api/projects/fundings';
                    method = 'PUT'
                    break;
                default:
                    throw new Error('Invalid modalId');
            }
            const response = await fetch(`${BASE_ENDPOINT}/${subRoute}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formDetails, projectId: project.projectId }),
            });
            if (!response.ok) {
                setLoading(false);
                setError(`Update failed`);
                throw new Error('Form submission failed');
            }
            setLoading(false);
            const result = await response.json();
            setError(`${result.message}`);
        } catch (error) {
            setLoading(false);
            setError(`Update failed. ${error.message}`);
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
            case "funding":
            case "beneficiaries":
                const section = modalId === "funding" ? "fundingSources" : "beneficiaries";
                return (
                    <>
                        {(formDetails[section] || []).map((item, index) => (
                            <React.Fragment key={index}>
                                <Label>{modalId === "funding" ? `Funding Source ${index + 1}:` : `Beneficiary ${index + 1}:`}</Label>
                                {Object.entries(item).map(([field, value], subIndex) => (
                                    <React.Fragment key={subIndex}>
                                        <Label>{toTitleCase(field.replace(/([A-Z])/g, ' $1').trim())}</Label>
                                        {(field === "funderName") ?
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
                                            : (field === "currencyName") ?
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
                                                :
                                                <BaseInputWrapper
                                                    as="input"
                                                    type="text"
                                                    name={field}
                                                    value={value || ''}
                                                    onChange={(e) => handleNestedChange(section, index, e)}
                                                />
                                        }
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
