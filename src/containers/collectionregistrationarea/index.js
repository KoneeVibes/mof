import { useState } from "react";
import { BaseButton } from "../../components/buttons/styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { Layout } from "../layout";
import { CollectionRegistrationAreaWrapper } from "./styled";
import { useNavigate } from "react-router-dom";
import { DotLoader } from "react-spinners";
import Cookies from "universal-cookie";
import { addCollection } from "../../util/apis/addCollection";
import { BaseModal } from "../../components/modal";

export const CollectionRegistrationArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const navigateToDashboard = async () => {
        await setIsSuccessModalOpen(false);
        return navigate("/dashboard");
    }

    const handleSuccessModalPersist = () => {
        setIsSuccessModalOpen(true);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await addCollection(token, formDetails);
            if (response.status === "Success") {
                setLoading(false);
                setIsSuccessModalOpen(true);
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
            <CollectionRegistrationAreaWrapper>
                <BaseModal
                    open={isSuccessModalOpen}
                    width={"40%"}
                    height={"auto"}
                    callToAction={"Continue"}
                    message={"Collection created successfully"}
                    onClose={handleSuccessModalPersist}
                    handleCallToActionClick={navigateToDashboard}
                />
                <H2>REGISTER NEW PROJECT COLLECTION</H2>
                <form onSubmit={handleSubmit}>
                    <Label>Collection Name</Label>
                    <BaseInputWrapper
                        as="input"
                        type="text"
                        name="name"
                        placeholder="Enter Name of Collection"
                        required
                        value={formDetails.name}
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
            </CollectionRegistrationAreaWrapper>
        </Layout>
    )
}
