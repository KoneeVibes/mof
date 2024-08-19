import { useState } from "react";
import { BaseButton } from "../../components/buttons/styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { Layout } from "../layout";
import { CurrencyOnboardingAreaWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { onboardCurrency } from "../../util/apis/onboardCurrency";
import Cookies from "universal-cookie";

export const CurrencyOnboardingArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
        abbreviation: "",
        symbol: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await onboardCurrency(token, formDetails);
            if (response.status === "Success") {
                setLoading(false);
                navigate("/dashboard")
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
            <CurrencyOnboardingAreaWrapper>
                <H2>CURRENCY</H2>
                <form onSubmit={handleSubmit}>
                    <Label>Currency Name</Label>
                    <BaseInputWrapper
                        as="input"
                        type="text"
                        name="name"
                        placeholder="Enter Name of Currency"
                        required
                        value={formDetails.name}
                        onChange={handleChange}
                    />
                    <Label>Currency Abbreviation</Label>
                    <BaseInputWrapper
                        as="input"
                        type="text"
                        name="abbreviation"
                        placeholder="Enter Currency Abbreviation"
                        required
                        value={formDetails.abbreviation}
                        onChange={handleChange}
                    />
                    <Label>Currency Symbol</Label>
                    <BaseInputWrapper
                        as="input"
                        type="text"
                        name="symbol"
                        placeholder="Enter Symbol of Currency"
                        required
                        value={formDetails.symbol}
                        onChange={handleChange}
                    />
                    <BaseButton type="submit">
                        {loading ?
                            <DotLoader
                                size={20}
                                color="white"
                                className="dotLoader"
                            /> : "Continue"}
                    </BaseButton>
                </form>
                {error && <P style={{ color: 'red' }}>{error}</P>}
            </CurrencyOnboardingAreaWrapper>
        </Layout>
    )
}
