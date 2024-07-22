import { useEffect, useState } from "react";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { Dashboard } from "../dashboard";
import { SubAdminOnboardingAreaWrapper } from "./styled";
import { onboardSubAdmin } from "../../util/apis/onboardSubAdmin";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { getAllOrganizations } from "../../util/apis/getAllOrganizations";
import { BaseButton } from "../../components/buttons/styled";
import { DotLoader } from "react-spinners";

export const SubAdminOnboardingArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;
    const { organization } = cookie.USER;

    const navigate = useNavigate();
    const { projectId } = useParams();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        try {
            const response = await onboardSubAdmin(token, formDetails);
            if (response.status === "Success") {
                setLoading(false);
                navigate(`/${organization.replace(/\s+/g, '').toLowerCase()}/${projectId}`);
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
            <SubAdminOnboardingAreaWrapper>
                <H2>SUB-ADMIN DETAILS</H2>
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
            </SubAdminOnboardingAreaWrapper>
        </Dashboard>
    );
};
