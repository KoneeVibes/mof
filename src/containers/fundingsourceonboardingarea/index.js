import { useState } from "react";
import { BaseButton } from "../../components/buttons/styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { Layout } from "../layout";
import { FundingSourceOnboardingAreaWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { onboardFundingSource } from "../../util/apis/onboardFundingSource";
import Cookies from "universal-cookie";

export const FundingSourceOnboardingArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
        abbreviation: ""
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
            const response = await onboardFundingSource(token, formDetails);
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
            <FundingSourceOnboardingAreaWrapper>
                <H2>FUNDING SOURCE</H2>
                <form onSubmit={handleSubmit}>
                    <Label>Funding Source Name</Label>
                    <BaseInputWrapper
                        as="input"
                        type="text"
                        name="name"
                        placeholder="Enter Name of Funding Source"
                        required
                        value={formDetails.name}
                        onChange={handleChange}
                    />
                    <Label>Funding Source Abbreviation</Label>
                    <BaseInputWrapper
                        as="input"
                        type="text"
                        name="abbreviation"
                        placeholder="Enter Abbreviation of Funding Source"
                        required
                        value={formDetails.abbreviation}
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
            </FundingSourceOnboardingAreaWrapper>
        </Layout>
    )
}