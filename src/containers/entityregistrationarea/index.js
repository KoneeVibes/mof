import { Dashboard } from "../dashboard";
import { EntityRegistrationAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { BaseButton } from "../../components/buttons/styled";
import { useState } from "react";
import { addOrganization } from "../../util/apis/addOrganization";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export const EntityRegistrationArea = () => {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");

    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [formDetails, setFormDetails] = useState({
        name: "",
        orgType: "",
        parentOrg: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formDetails);
        try {
            const response = await addOrganization(token, formDetails);
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
            <EntityRegistrationAreaWrapper>
                <H2>PROJECT DETAILS</H2>
                <P>PLEASE ENTER THE PROJECT INFORMATION</P>
                <form onSubmit={handleSubmit}>
                    <Label>Name of Organisation:</Label>
                    <BaseInputWrapper
                        type="text"
                        name="name"
                        required
                        value={formDetails.name}
                        onChange={handleChange}
                    />
                    <Label>Select Organisation Type:</Label>
                    <BaseInputWrapper
                        type="text"
                        name="orgType"
                        required
                        value={formDetails.orgType}
                        onChange={handleChange}
                    />
                    <Label>Select Parent Organisation:</Label>
                    <BaseInputWrapper
                        type="text"
                        name="parentOrg"
                        required
                        value={formDetails.parentOrg}
                        onChange={handleChange}
                    />
                    <BaseButton type="submit">Continue</BaseButton>
                </form>
                {error && <P style={{ color: 'red' }}>{error}</P>}
            </EntityRegistrationAreaWrapper>
        </Dashboard>
    );
};
