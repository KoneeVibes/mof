import React, { useState, useEffect } from "react";
import { Label } from "../../components/typography/styled";
import { DetailsEditAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { ProjectRegistrationBaseButton } from "../projectregistrationarea/styled";
import { BaseButton } from "../../components/buttons";
import { DotLoader } from "react-spinners";

export const DetailsEditArea = React.forwardRef((props, ref) => {
    const { modalId } = props;
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({});

    useEffect(() => {
        const fetchInitialValues = async () => {
            try {
                let apiUrl = '';
                switch (modalId) {
                    case "basic":
                        apiUrl = '/api/basicDetails';
                        break;
                    case "beneficiaries":
                        apiUrl = '/api/beneficiariesDetails';
                        break;
                    case "funding":
                        apiUrl = '/api/fundingDetails';
                        break;
                    default:
                        return;
                }
                const response = await fetch(apiUrl);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setFormDetails(data || {});
            } catch (error) {
                console.error('Error fetching initial values:', error);
                setFormDetails({});
            }
        };
        fetchInitialValues();
    }, [modalId]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleAddNewEntry = (section) => {
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
    };

    const handleRemoveEntry = (section, index) => {
        setFormDetails(prevDetails => ({
            ...prevDetails,
            [section]: (prevDetails[section] || []).filter((_, i) => i !== index),
        }));
    };

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
                    apiUrl = '/api/beneficiariesDetails';
                    break;
                case "funding":
                    apiUrl = '/api/fundingDetails';
                    break;
                default:
                    throw new Error('Invalid modalId');
            }
            const response = await fetch(apiUrl, {
                method: 'POST',
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
                return Array.isArray(formDetails.fundingSources) ? (
                    <>
                        {formDetails.fundingSources.map((source, index) => (
                            <React.Fragment key={index}>
                                <Label>Funding Source {index + 1}</Label>
                                {Object.entries(source).map(([field, value], subIndex) => (
                                    <React.Fragment key={subIndex}>
                                        <Label>{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                        <BaseInputWrapper
                                            as="input"
                                            type="text"
                                            name={`${field}[${index}]`}
                                            value={value || ''}
                                            onChange={handleChange}
                                        />
                                    </React.Fragment>
                                ))}
                                <ProjectRegistrationBaseButton
                                    type="button"
                                    onClick={() => handleRemoveEntry("fundingSources", index)}
                                >
                                    -
                                </ProjectRegistrationBaseButton>
                            </React.Fragment>
                        ))}
                        <ProjectRegistrationBaseButton
                            type="button"
                            onClick={() => handleAddNewEntry("fundingSources")}
                        >
                            Add New Entry
                        </ProjectRegistrationBaseButton>
                    </>
                ) : null;
            case "beneficiaries":
                return Array.isArray(formDetails.beneficiaries) ? (
                    <>
                        {formDetails.beneficiaries.map((beneficiary, index) => (
                            <React.Fragment key={index}>
                                <Label>Beneficiary {index + 1}</Label>
                                {Object.entries(beneficiary).map(([field, value], subIndex) => (
                                    <React.Fragment key={subIndex}>
                                        <Label>{field.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                        <BaseInputWrapper
                                            as="input"
                                            type="text"
                                            name={`${field}[${index}]`}
                                            value={value || ''}
                                            onChange={handleChange}
                                        />
                                    </React.Fragment>
                                ))}
                                <ProjectRegistrationBaseButton
                                    type="button"
                                    onClick={() => handleRemoveEntry("beneficiaries", index)}
                                >
                                    -
                                </ProjectRegistrationBaseButton>
                            </React.Fragment>
                        ))}
                        <ProjectRegistrationBaseButton
                            type="button"
                            onClick={() => handleAddNewEntry("beneficiaries")}
                        >
                            Add New Entry
                        </ProjectRegistrationBaseButton>
                    </>
                ) : null;
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
