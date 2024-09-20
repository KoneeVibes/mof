import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../components/buttons/styled";
import { AuthWrapper, AuthRow } from "./styled";
import authImg from "../../assets/authImg.svg";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H1, Label, P } from "../../components/typography/styled";
import Cookies from "universal-cookie";
import { authenticateUser } from "../../util/apis/authUser";
import { DotLoader } from "react-spinners";
import { resetPassword } from "../../util/apis/passwordReset";

export const Auth = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [showPasswordRecoveryForm, setShowPasswordRecoveryForm] = useState(false);
    const [formDetails, setFormDetails] = useState({
        email: "",
        password: ""
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormDetails({
            ...formDetails,
            [name]: value,
        });
    };

    useEffect(() => {
        setFormDetails(prevDetails => ({
            email: prevDetails.email,
            ...(showPasswordRecoveryForm ? {} : { password: "" })
        }));
    }, [showPasswordRecoveryForm]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setLoading(true);
        try {
            let response;
            // toggle endpoints below
            if (!showPasswordRecoveryForm) {
                response = await authenticateUser(formDetails);
            } else {
                response = await resetPassword(undefined, "forgotpassword", formDetails);
            }
            if (response.status === "Success") {
                setLoading(false);
                // toggle success states for different endpoints below
                if (!showPasswordRecoveryForm) {
                    cookies.set("TOKEN", response.token, {
                        path: "/",
                        // should check this out pretty much later.
                        maxAge: 1000000,
                    })
                    cookies.set("USER", response.data, {
                        path: "/",
                        // should check this out pretty much later.
                        maxAge: 1000000,
                    })
                    navigate("/dashboard");
                } else {
                    setError('An email has been sent for reset to your email address');
                }
            } else if (response.status === "Force-Reset") {
                setLoading(false);
                cookies.set("TOKEN", response.token, {
                    path: "/",
                    // should check this out pretty much later.
                    maxAge: 1000000,
                })
                cookies.set("USER", response.data, {
                    path: "/",
                    // should check this out pretty much later.
                    maxAge: 1000000,
                })
                navigate(`/user/${response.data.userId}/firsttimepasswordreset`);
            }
            else {
                setLoading(false);
                setError('Authentication failed. Please check your credentials and try again.');
            }
        } catch (error) {
            setLoading(false);
            setError(`Login failed. ${error.message}`);
            console.error('Login failed:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <AuthWrapper>
            <AuthRow tocolumn={"true"}>
                <div className="auth-img-div">
                    <img src={authImg} alt="auth-img" />
                </div>
                <div className="auth-form-div">
                    <H1>International Economic Relations Portal</H1>
                    {(!showPasswordRecoveryForm) ? (
                        <P>Enter details to login.</P>
                    ) : (
                        <P>Enter email address</P>
                    )}
                    <form onSubmit={handleSubmit}>
                        <BaseInputWrapper
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formDetails.email}
                            onChange={handleChange}
                        />
                        {(!showPasswordRecoveryForm) && (
                            <React.Fragment>
                                <div style={{ position: "relative", width: "-webkit-fill-available" }}>
                                    <BaseInputWrapper
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        placeholder="Password"
                                        required
                                        value={formDetails.password}
                                        onChange={handleChange}
                                        width={"-webkit-fill-available"}
                                    />
                                    <Label className="showPassword">
                                        <input
                                            type="checkbox"
                                            checked={passwordVisible}
                                            onChange={togglePasswordVisibility}
                                            style={{ display: "none", marginRight: "5px" }}
                                        />
                                        SHOW
                                    </Label>
                                </div>
                                <P className="forgotPassword" onClick={() => setShowPasswordRecoveryForm(true)}>FORGOT PASSWORD?</P>
                            </React.Fragment>
                        )}
                        <BaseButton type="submit">
                            {loading ?
                                <DotLoader
                                    size={20}
                                    color="white"
                                    className="dotLoader"
                                /> : (!showPasswordRecoveryForm) ? "LOG IN" : "RESET PASSWORD"}
                        </BaseButton>
                    </form>
                    {error && <P style={{ color: 'red' }}>{error}</P>}
                </div>
            </AuthRow>
        </AuthWrapper>
    );
};
