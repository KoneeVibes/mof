import { useEffect, useState } from "react";
import { BaseModal } from "../../components/modal";
import { H2, Label, P } from "../../components/typography/styled";
import { updateUserAccount } from "../../util/apis/updateUserAccount";
import { Layout } from "../layout";
import { SubAdminEditAreaWrapper } from "./styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
// import { SelectFieldWrapper } from "../../components/formfields/select/styled";
import { BaseButton } from "../../components/buttons";
import { DotLoader } from "react-spinners";
// import { getAllOrganizations } from "../../util/apis/getAllOrganizations";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
// import { flattenOrganizations } from "../../config/flattenOrganizations";
import { getUser } from "../../util/apis/getUser";

export const SubAdminEditArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const { userId } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    // const [organizations, setOrganizations] = useState([]);
    const [formDetails, setFormDetails] = useState({
        email: "",
        organization: "",
    });

    // useEffect(() => {
    //     if (token) {
    //         getAllOrganizations(token).then((listOfOrganizations) => {
    //             const collapsedList = flattenOrganizations(listOfOrganizations);
    //             setOrganizations(collapsedList.map(organization => organization.name));
    //         }).catch((error) => {
    //             console.error("Failed to fetch organizations:", error);
    //         });
    //     }
    // }, [token]);

    useEffect(() => {
        if (!userId) return;
        const fetchSubAdmin = async () => {
            try {
                const response = await getUser(token, userId);
                setFormDetails({
                    email: response.email,
                    organization: response.organization
                });
            } catch (error) {
                console.error("Failed to fetch subadmin:", error);
            }
        };
        fetchSubAdmin();
    }, [userId, token]);

    const handleSuccessModalPersist = () => {
        setIsSuccessModalOpen(true);
    };

    const navigateToSubAdminsArea = async () => {
        await setIsSuccessModalOpen(false);
        return navigate("/system/sub-admins");
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
        if (!userId) return;
        setError(null);
        setLoading(true);
        try {
            const response = await updateUserAccount(token, userId, formDetails);
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
            <SubAdminEditAreaWrapper>
                <BaseModal
                    open={isSuccessModalOpen}
                    width={"40%"}
                    height={"auto"}
                    callToAction={"Continue"}
                    message={"Sub admin updated successfully"}
                    onClose={handleSuccessModalPersist}
                    handleCallToActionClick={navigateToSubAdminsArea}
                />
                <H2>EDIT SUB-ADMIN</H2>
                <form onSubmit={handleSubmit}>
                    <Label>Email</Label>
                    <BaseInputWrapper
                        type="text"
                        name="email"
                        required
                        value={formDetails.email}
                        onChange={handleChange}
                    />
                    {/* <Label>Select Organisation</Label>
                    <SelectFieldWrapper
                        name="organization"
                        value={formDetails.organization}
                        onChange={handleChange}
                        disabled
                    >
                        <option value="">Select Organization</option>
                        {organizations.map((organization, key) => (
                            <option key={key} value={organization}>
                                {organization}
                            </option>
                        ))}
                    </SelectFieldWrapper> */}
                    <Label>Organisation</Label>
                    <BaseInputWrapper
                        required
                        disabled
                        type="text"
                        name="organization"
                        value={formDetails.organization}
                        onChange={handleChange}
                    />
                    <BaseButton
                        type="submit"
                    >
                        {loading ?
                            <DotLoader
                                size={20}
                                color="white"
                                className="dotLoader"
                            /> : "Submit"}
                    </BaseButton>
                </form>
                {error && <P style={{ color: 'red' }}>{error}</P>}
            </SubAdminEditAreaWrapper>
        </Layout>
    )
}