import React, { useEffect, useState } from "react";
import { BaseButton } from "../../components/buttons/styled";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H2, Label, P } from "../../components/typography/styled";
import { Layout } from "../layout";
import { PasswordResetAreaWrapper } from "./styled";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DotLoader } from "react-spinners";
import { BaseModal } from "../../components/modal";
import Cookies from "universal-cookie";
import { resetPassword } from "../../util/apis/passwordReset";

export const PasswordResetArea = () => {
    const cookies = new Cookies();
    const cookie = cookies.getAll();
    let token = cookie.TOKEN;

    const navigate = useNavigate();
    const { action } = useParams();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [queryToken, setQueryToken] = useState(undefined);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [formDetails, setFormDetails] = useState({
        ...((action === "passwordreset" || action === "firsttimepasswordreset") && { oldPassword: "" }),
        newPassword: "",
        confirmNewPassword: "",
    });

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const query = queryParams.get('token');
        setQueryToken(query);
    }, [location.search]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDetails((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const navigateToDashboard = async () => {
        await setIsSuccessModalOpen(false);
        return navigate("/");
      }
    
      const handleSuccessModalPersist = () => {
        setIsSuccessModalOpen(true);
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        if (queryToken) {
            token = queryToken;
        };
        try {
            const response = await resetPassword(token, action, formDetails);
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
            <PasswordResetAreaWrapper>
            <BaseModal
                    open={isSuccessModalOpen}
                    width={"40%"}
                    height={"auto"}
                    callToAction={"Continue"}
                    message={"Password reset successfully"}
                    onClose={handleSuccessModalPersist}
                    handleCallToActionClick={navigateToDashboard}
                />
                <H2>RESET PASSWORD</H2>
                <form onSubmit={handleSubmit}>
                    {(action === "passwordreset" || action === "firsttimepasswordreset") && (
                        <React.Fragment>
                            <Label>Old Password</Label>
                            <BaseInputWrapper
                                as="input"
                                type="text"
                                name="oldPassword"
                                placeholder="Enter Old Password"
                                required
                                value={formDetails.oldPassword}
                                onChange={handleChange}
                            />
                        </React.Fragment>
                    )}
                    <Label>New Password</Label>
                    <BaseInputWrapper
                        as="input"
                        type="text"
                        name="newPassword"
                        placeholder="Enter New Password"
                        required
                        value={formDetails.newPassword}
                        onChange={handleChange}
                    />
                    <Label>Confirm Password</Label>
                    <BaseInputWrapper
                        as="input"
                        type="text"
                        name="confirmNewPassword"
                        placeholder="Confirm New Password"
                        required
                        value={formDetails.confirmNewPassword}
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
            </PasswordResetAreaWrapper>
        </Layout>
    )
}
