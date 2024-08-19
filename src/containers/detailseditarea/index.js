import React, { useState, useEffect, useCallback } from "react";
import { Label } from "../../components/typography/styled";
import { DetailsEditAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { ProjectRegistrationBaseButton } from "../projectregistrationarea/styled";
import { BaseButton } from "../../components/buttons";
import { DotLoader } from "react-spinners";

export const DetailsEditArea = React.forwardRef((props, ref) => {
    const { modalId, project } = props;
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({});

    useEffect(() => {
        const fetchInitialValues = async () => {
            try {
                let details = {};
                switch (modalId) {
                    case "basic":
                        details = {
                            projectTitle: project?.projectTitle || "",
                            description: project?.description || "",
                            effectiveDate: project?.dateEffective || "",
                        };
                        break;
                    case "beneficiaries":
                        details = {
                            beneficiaries: project?.beneficiaries || [{ name: "" }],
                        };
                        break;
                    case "funding":
                        details = {
                            fundingSources: project?.fundingSources || [{ funderName: "", amount: 0, currencyName: "" }],
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

    const handleAddNewEntry = useCallback((section) => {
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

    const handleRemoveEntry = useCallback((section, index) => {
        setFormDetails(prevDetails => ({
            ...prevDetails,
            [section]: (prevDetails[section] || []).filter((_, i) => i !== index),
        }));
    }, []);

    useEffect(() => console.log(formDetails));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let apiUrl = '';
            switch (modalId) {
                case "basic":
                    apiUrl = '/api/basicDetails';
                    break;
                case "beneficiaries":
                    apiUrl = '/api/projects/beneficiaries';
                    break;
                case "funding":
                    apiUrl = '/api/projects/fundings';
                    break;
                default:
                    throw new Error('Invalid modalId');
            }
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDetails),
            });
            if (!response.ok) {
                setLoading(false);
                throw new Error('Network response was not ok');
            }
            setLoading(false);
            const result = await response.json();
            console.log('Form submitted successfully:', result);
            // Handle further actions here (e.g., show success message, reset form)
        } catch (error) {
            setLoading(false);
            console.error('Error submitting form:', error);
            // Optionally, handle the error (e.g., show an error message to the user)
        }
    };

    const renderInputs = () => {
        switch (modalId) {
            case "basic":
                return Object.entries(formDetails).map(([key, value], index) => (
                    <React.Fragment key={index}>
                        <Label>{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                        <BaseInputWrapper
                            as="input"
                            type="text"
                            name={key}
                            value={value || ''}
                            onChange={handleChange}
                        />
                    </React.Fragment>
                ));
            case "funding":
            case "beneficiaries":
                const section = modalId === "funding" ? "fundingSources" : "beneficiaries";
                return (formDetails[section] || []).map((item, index) => (
                    <React.Fragment key={index}>
                        <Label>{modalId === "funding" ? `Funding Source ${index + 1}` : `Beneficiary ${index + 1}`}</Label>
                        {Object.entries(item).map(([field, value], subIndex) => (
                            <React.Fragment key={subIndex}>
                                <Label>{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                <BaseInputWrapper
                                    as="input"
                                    type="text"
                                    name={field}
                                    value={value || ''}
                                    onChange={(e) => handleNestedChange(section, index, e)}
                                />
                                <ProjectRegistrationBaseButton
                                    type="button"
                                    onClick={() => handleRemoveEntry(modalId, index)}
                                >
                                    -
                                </ProjectRegistrationBaseButton>
                            </React.Fragment>
                        ))}
                        <ProjectRegistrationBaseButton
                            type="button"
                            onClick={() => handleAddNewEntry(modalId)}
                        >
                            Add New Entry
                        </ProjectRegistrationBaseButton>
                    </React.Fragment>
                ));
            default:
                return null;
        }
    };

    return (
        <DetailsEditAreaWrapper ref={ref}>
            <form onSubmit={handleSubmit}>
                {renderInputs()}
                <BaseButton type="submit">
                    {loading ?
                        <DotLoader
                            size={20}
                            color="white"
                            className="dotLoader"
                        /> : "Continue"}
                </BaseButton>
            </form>
        </DetailsEditAreaWrapper>
    );
});
