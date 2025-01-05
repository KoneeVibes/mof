import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { BaseButton } from "../../components/buttons";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { BaseModal } from "../../components/modal";
import { H2, Label, P } from "../../components/typography/styled";
import { Layout } from "../layout";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import { EntityEditAreaWrapper } from "./styled";
import { updateOrganization } from "../../util/apis/updateOrganization";
import { flattenOrganizations } from "../../config/flattenOrganizations";
import { getAllOrganizations } from "../../util/apis/getAllOrganizations";
import { getOrganization } from "../../util/apis/getOrganization";

export const EntityEditArea = () => {
    const cookies = new Cookies();
    const token = cookies.get("TOKEN");
    const orgTypes = ["Ministry", "Department", "Agency", "State"];

    const { entityId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [organizations, setOrganizations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
        orgType: "",
        parentOrg: "",
    });

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
        if (!entityId) return;
        const fetchOrganization = async () => {
            try {
                const response = await getOrganization(token, entityId);
                setFormDetails({
                    name: response.name,
                    orgType: response.orgType,
                    parentOrg: response.parentOrg ?? "",
                });
            } catch (error) {
                console.error("Failed to fetch organization:", error);
            }
        };
        fetchOrganization();
    }, [entityId, token]);

    const handleSuccessModalPersist = () => {
        setIsSuccessModalOpen(true);
    };

    const navigateToDashboard = async () => {
        await setIsSuccessModalOpen(false);
        return navigate("/dashboard");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!entityId) return;
        setError(null);
        setLoading(true);
        try {
            const response = await updateOrganization(token, entityId, formDetails);
            if (response.status === "Success") {
                setLoading(false);
                setIsSuccessModalOpen(true);
            } else {
                setLoading(false);
                setError(`"Submission failed:". Please check your inputs and try again.`);
            }
        } catch (error) {
            setLoading(false);
            setError(`Submission failed: ${error.message}`);
            console.error("Submission failed:", error);
        }
    };

    return (
        <Layout>
            <EntityEditAreaWrapper>
                <BaseModal
                    open={isSuccessModalOpen}
                    width={"40%"}
                    height={"auto"}
                    callToAction={"Continue"}
                    message={"Organisation updated successfully"}
                    onClose={handleSuccessModalPersist}
                    handleCallToActionClick={navigateToDashboard}
                />
                <H2>EDIT MDA</H2>
                <form onSubmit={handleSubmit}>
                    <Label>Name of MDA:</Label>
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
            </EntityEditAreaWrapper>
        </Layout>
    )
}