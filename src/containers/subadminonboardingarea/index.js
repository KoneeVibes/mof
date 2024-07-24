import { useEffect, useState } from "react";
import { H2, Label, P } from "../../components/typography/styled";
import { Dashboard } from "../dashboard";
import { SubAdminOnboardingAreaWrapper } from "./styled";
import { onboardSubAdmin } from "../../util/apis/onboardSubAdmin";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { getAllOrganizations } from "../../util/apis/getAllOrganizations";
import { BaseButton } from "../../components/buttons/styled";
import { flattenOrganizations } from "../../config/flattenOrganizations";
import { getOrganizationMembers } from "../../util/apis/getOrganizationMembers";

export const SubAdminOnboardingArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;
    const { organizationId } = cookie.USER || {};

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [organizations, setOrganizations] = useState([]);
    const [members, setMembers] = useState([]);
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
            const response = await onboardSubAdmin(token, formDetails);
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

    useEffect(() => {
        if (token) {
            getAllOrganizations(token).then((listOfOrganizations) => {
                const collapsedList = flattenOrganizations(listOfOrganizations);
                setOrganizations(collapsedList);
            }).catch((error) => {
                console.error("Failed to fetch organizations:", error);
            });
        }
    }, [token]);

    useEffect(() => {
        getOrganizationMembers(token, organizationId)
            .then((data) => setMembers(data))
            .catch((err) => {
                console.error("Failed to fetch currencies:", err);
                setError("Failed to fetch currencies. Please try again later.");
            });
    }, [organizationId, token]);


    return (
        <Dashboard>
            <SubAdminOnboardingAreaWrapper>
                <H2>SUB-ADMIN DETAILS</H2>
                <form onSubmit={handleSubmit}>
                    <Label>Select Email</Label>
                    <SelectFieldWrapper
                        as="select"
                        name="email"
                        required
                        value={formDetails.email}
                        onChange={handleChange}
                    >
                        <option value="">Select a member of your MDA</option>
                        {members.map((member, key) => (
                            <option key={key} value={member.email}>
                                {member.email}
                            </option>
                        ))}
                    </SelectFieldWrapper>
                    <Label>Select Organization:</Label>
                    <SelectFieldWrapper
                        as="select"
                        name="organization"
                        required
                        value={formDetails.organization}
                        onChange={handleChange}
                    >
                        <option value="">Select subadmin organization</option>
                        {organizations.map((organization, key) => (
                            <option key={key} value={organization.name}>
                                {organization.name}
                            </option>
                        ))}
                    </SelectFieldWrapper>
                    <BaseButton as="button" type="submit">Continue</BaseButton>
                </form>
                {error && <P style={{ color: 'red' }}>{error}</P>}
            </SubAdminOnboardingAreaWrapper>
        </Dashboard>
    );
};
