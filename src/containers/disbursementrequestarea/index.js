import { useNavigate, useParams } from "react-router-dom";
import { BaseButton } from "../../components/buttons/styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { Dashboard } from "../dashboard";
import { DisbursementRequestAreaWrapper } from "./style";
import { useEffect, useState } from "react";
import { getCurrencies } from "../../util/apis/getCurrencies";
import Cookies from "universal-cookie";
import { makeDisbursementRequest } from "../../util/apis/makeDisbursementRequest";
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
        projectId: projectId,
        purpose: "",
        amount: "",
        currencyName: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await makeDisbursementRequest(TOKEN, formDetails);
            if (response.status === "Success") {
                setLoading(false);
                navigate(-1);
            } else {
                setError("Submission failed. Please check your inputs and try again.");
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setError("Submission failed. Please check your inputs and try again.");
        }
    }

    useEffect(() => {
        getCurrencies(TOKEN)
            .then((data) => setCurrencies(data))
            .catch((err) => {
                console.error("Failed to fetch currencies:", err);
                setError("Failed to fetch currencies. Please try again later.");
            });
    }, [TOKEN]);

    return (
        <Dashboard>
            <DisbursementRequestAreaWrapper>
                <H2>DISBURSEMENT REQUEST</H2>
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
                        // required
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
        </Dashboard>
    )
}