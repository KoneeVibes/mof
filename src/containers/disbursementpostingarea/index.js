import { useNavigate, useParams } from "react-router-dom";
import { BaseButton } from "../../components/buttons/styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { Layout } from "../layout";
import { DisbursementRequestAreaWrapper, DisbursementRequestBaseButton, DisbursementRequestBaseInputWrapper } from "./style";
import { useEffect, useState } from "react";
import { getCurrencies } from "../../util/apis/getCurrencies";
import Cookies from "universal-cookie";
import { makeDisbursement } from "../../util/apis/makeDisbursement";
import { DotLoader } from "react-spinners";

export const DisbursementRequestArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const { TOKEN } = cookie;

    const navigate = useNavigate();
    const { projectId } = useParams();
    const [currencies, setCurrencies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        projectId: parseInt(projectId),
        purpose: "",
        amount: "",
        currencyName: "",
        attachments: [{ file: "" }]
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: name === "amount" ? parseFloat(value) : value
        }));
    }

    const handleNestedChange = (section, index, event) => {
        const { name, files } = event.target;
        const updatedSection = formDetails[section].map((entry, i) =>
            i === index ? { ...entry, [name]: files[0] } : entry
        );
        setFormDetails((prevDetails) => ({
            ...prevDetails,
            [section]: updatedSection,
        }));
    };

    const handleAddNewEntry = (section) => {
        const newItem =
            section === "attachments"
                ? { file: "" }
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
        setError(null);
        setLoading(true);
        const formData = new FormData();
        formData.append("projectId", formDetails.projectId);
        formData.append("purpose", formDetails.purpose);
        formData.append("amount", formDetails.amount);
        formData.append("currencyName", formDetails.currencyName);
        formDetails.attachments.forEach((attachment, index) => {
            if (attachment.file) {
                formData.append(`attachments[${index}]`, attachment.file);
            }
        });
        try {
            const response = await makeDisbursement(TOKEN, formData);
            if (response.status === "Success") {
                navigate(-1);
            } else {
                setError("Submission failed. Please check your inputs and try again.");
            }
        } catch (err) {
            setError(`Submission failed. ${err.message}`);
            console.error("Submission failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCurrencies(TOKEN)
            .then((data) => setCurrencies(data))
            .catch((err) => {
                console.error("Failed to fetch currencies:", err);
                setError("Failed to fetch currencies. Please try again later.");
            });
    }, [TOKEN]);

    return (
        <Layout>
            <DisbursementRequestAreaWrapper>
                <H2>DISBURSEMENT POSTING</H2>
                <form onSubmit={handleSubmit}>
                    <Label>Disbursement Purpose</Label>
                    <BaseInputWrapper
                        as="input"
                        type="text"
                        name="purpose"
                        placeholder="Enter Purpose of Disbursement"
                        required
                        value={formDetails.purpose}
                        onChange={handleChange}
                    />
                    <Label>Amount</Label>
                    <BaseInputWrapper
                        as="input"
                        type="number"
                        name="amount"
                        placeholder="Enter Amount"
                        required
                        value={formDetails.amount}
                        onChange={handleChange}
                    />
                    <Label>Select Currency:</Label>
                    <SelectFieldWrapper
                        as="select"
                        name="currencyName"
                        value={formDetails.currencyName}
                        onChange={handleChange}
                    >
                        <option value="">Select a currency</option>
                        {currencies.map((currency, key) => (
                            <option key={key} value={currency.name}>
                                {currency.name}
                            </option>
                        ))}
                    </SelectFieldWrapper>
                    <Label>Attachment</Label>
                    {formDetails?.attachments.map((attachment, index) => (
                        <DisbursementRequestBaseInputWrapper key={index}>
                            <BaseInputWrapper
                                as="input"
                                type="file"
                                name="file"
                                placeholder="Select Attachment"
                                onChange={(e) => handleNestedChange("attachments", index, e)}
                            />
                            <DisbursementRequestBaseButton
                                type="button"
                                onClick={() => handleRemoveEntry("attachments", index)}
                            >
                                -
                            </DisbursementRequestBaseButton>
                        </DisbursementRequestBaseInputWrapper>
                    ))}
                    <DisbursementRequestBaseButton type="button" onClick={() => handleAddNewEntry("attachments")}>
                        Add New Entry
                    </DisbursementRequestBaseButton>
                    <BaseButton as="button" type="submit">
                        {loading ?
                            <DotLoader
                                size={20}
                                color="white"
                                className="dotLoader"
                            /> : "Continue"}
                    </BaseButton>
                </form>
                {error && <P style={{ color: 'red' }}>{error}</P>}
            </DisbursementRequestAreaWrapper>
        </Layout >
    )
}