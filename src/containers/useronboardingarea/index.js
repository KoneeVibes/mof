import { useEffect, useState } from "react";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { Dashboard } from "../dashboard";
import { UserOnboardingAreaWrapper } from "./styled";
import { getAllOrganizations } from "../../util/apis/getAllOrganizations";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { onboardUser } from "../../util/apis/onboardUser";

export const UserOnboardingArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [organizations, setOrganizations] = useState([]);
    const [formDetails, setFormDetails] = useState({
        email: "",
        organization: ""
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
        try {
            const response = await onboardUser(token, formDetails);
            if (response.status === "Success") {
                navigate("/dashboard")
            } else {
                setError("Submission failed. Please check your inputs and try again.");
            }
        } catch (error) {
            console.error("Submission failed:", error);
            setError("Submission failed. Please check your inputs and try again.");
        }
    };

    useEffect(() => {
        getAllOrganizations(token)
            .then((listOfOrganizations) => setOrganizations(listOfOrganizations))
            .catch((err) => console.error("Failed to fetch organizations:", err));
    }, [token]);

    return (
        <Dashboard>
            <UserOnboardingAreaWrapper>
                <H2>USER DETAILS</H2>
                <form onSubmit={handleSubmit}>
                    <Label>Enter Email</Label>
                    <BaseInputWrapper
                        as="input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formDetails.email}
                        onChange={handleChange}
                    />
                    <Label>Select Organization:</Label>
                    <SelectFieldWrapper
                        as="select"
                        name="organization"
                        required
                        value={formDetails.organization}
                        onChange={handleChange}
                    >
                        <option value="">Select user organization</option>
                        {organizations.map((organization, key) => (
                            <option key={key} value={organization.name}>
                                {organization.name}
                            </option>
                        ))}
                    </SelectFieldWrapper>
                </form>
                {error && <P style={{ color: 'red' }}>{error}</P>}
            </UserOnboardingAreaWrapper>
        </Dashboard>
    )
}