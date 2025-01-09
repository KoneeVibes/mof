import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { BaseButton } from "../../components/buttons";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { BaseModal } from "../../components/modal";
import { H2, Label, P } from "../../components/typography/styled";
import { Layout } from "../layout";
import { CollectionEditAreaWrapper } from "./styled";
import { DotLoader } from "react-spinners";
import { updateCollection } from "../../util/apis/updateCollection";
import { getCollection } from "../../util/apis/getCollection";

export const CollectionEditArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    const token = cookie.TOKEN;

    const { collectionId } = useParams();
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: "",
    });

    useEffect(() => {
        if (!collectionId) return;
        const fetchCollectionById = async () => {
            try {
                const response = await getCollection(token, collectionId);
                setFormDetails({
                    name: response.name,
                });
            } catch (error) {
                console.error("Failed to fetch collection:", error);
            }
        };
        fetchCollectionById();
    }, [collectionId, token]);

    const handleSuccessModalPersist = () => {
        setIsSuccessModalOpen(true);
    };

    const navigateToCollectionsArea = async () => {
        await setIsSuccessModalOpen(false);
        return navigate("/system/collections");
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
        if (!collectionId) return;
        setError(null);
        setLoading(true);
        try {
            const response = await updateCollection(token, collectionId, formDetails);
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
            <CollectionEditAreaWrapper>
                <BaseModal
                    open={isSuccessModalOpen}
                    width={"40%"}
                    height={"auto"}
                    callToAction={"Continue"}
                    message={"Collection updated successfully"}
                    onClose={handleSuccessModalPersist}
                    handleCallToActionClick={navigateToCollectionsArea}
                />
                <H2>EDIT COLLECTION</H2>
                <form onSubmit={handleSubmit}>
                    <Label>Name</Label>
                    <BaseInputWrapper
                        type="text"
                        name="name"
                        required
                        value={formDetails.name.replace(/\b\w/g, char => char.toUpperCase())}
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
            </CollectionEditAreaWrapper>
        </Layout>
    )
}