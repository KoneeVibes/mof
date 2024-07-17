import { Dashboard } from "../dashboard";
import { EntityRegistrationAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { BaseButton } from "../../components/buttons/styled";
import { useEffect, useState } from "react";
import { addOrganization } from "../../util/apis/addOrganization";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { getAllOrganizations } from "../../util/apis/getAllOrganizations";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";

export const EntityRegistrationArea = () => {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const orgTypes = ["Ministry", "Parastatal"];

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [organizations, setOrganizations] = useState([]);
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

    useEffect(() => {
        getAllOrganizations(token).then((listOfOrganizations) => setOrganizations(listOfOrganizations));
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                    <SelectFieldWrapper
                        name="orgType"
                        required
                        value={formDetails.orgType}
                        onChange={handleChange}
                    >
                        <option value="">Select a type</option>
                        {orgTypes.map((orgType, key) => (
                            <option key={key} value={orgType}>
                                {orgType}
                            </option>
                        ))}
                    </SelectFieldWrapper>
                    <Label>Select Parent Organisation:</Label>
                    <SelectFieldWrapper
                        name="parentOrg"
                        value={formDetails.parentOrg}
                        onChange={handleChange}
                    >
                        <option value="">Select a Parent Organisation</option>
                        {organizations.filter((org) => org.orgType === "Ministry").map((organization, key) => (
                            <option key={key} value={organization.name}>
                                {organization.name}
                            </option>
                        ))}
                    </SelectFieldWrapper>
                    <BaseButton type="submit">Continue</BaseButton>
                </form>
                {error && <P style={{ color: 'red' }}>{error}</P>}
            </EntityRegistrationAreaWrapper>
        </Dashboard>
    );
};
