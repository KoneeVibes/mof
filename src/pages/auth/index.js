import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../components/buttons/styled";
import { AuthWrapper } from "./styled";
import fmof from '../../assets/fmof.png';
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { H1, Label, P } from "../../components/typography/styled";
import Cookies from "universal-cookie";
import { authenticateUser } from "../../util/apis/authUser";
import { DotLoader } from "react-spinners";
import { resetPassword } from "../../util/apis/passwordReset";
import email from "../../assets/emailicon.svg";
import password from "../../assets/passwordicon.svg";
import showPassword from "../../assets/showpassword.svg";
import authImg from "../../assets/auth-img.png";

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
                navigate(`/user/preauth/firsttimepasswordreset`);
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
            <div className="auth-thumbnail-area">
                <img src={fmof} alt="Logo" className="logo" />
                <div className="text-area">
                    <H1>Secure Login Portal</H1>
                    <P>Welcome to the International Economic Relations secure login portal. This portal is for authorised personnel only. Please enter your credentials to gain access.</P>
                </div>
                <div
                    className="thumbnail-area"
                >
                    <img
                        src={authImg}
                        alt="auth-img"
                    />
                </div>
            </div>
            <div className="auth-form-area">
                <div className="auth-form">
                    <legend>Welcome Back</legend>
                    {(!showPasswordRecoveryForm) ? (
                        <P></P>
                    ) : (
                        <P>Enter email address</P>
                    )}
                    <form
                        onSubmit={handleSubmit}
                    >
                        <fieldset>
                            <Label>Email Address</Label>
                            <div className="form-field">
                                <img src={email} alt="email icon" />
                                <BaseInputWrapper
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    required
                                    border={"none"}
                                    boxshadow={"none"}
                                    value={formDetails.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </fieldset>
                        {(!showPasswordRecoveryForm) && (
                            <React.Fragment>
                                <div
                                    style={{
                                        position: "relative", width: "-webkit-fill-available", overflow: "hidden"
                                    }}
                                >
                                    <fieldset>
                                        <Label>Password</Label>
                                        <div className="form-field">
                                            <img src={password} alt="password icon" />
                                            <BaseInputWrapper
                                                type={passwordVisible ? "text" : "password"}
                                                name="password"
                                                placeholder="Enter Password"
                                                required
                                                border={"none"}
                                                boxshadow={"none"}
                                                value={formDetails.password}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <Label className="showPassword">
                                            <input
                                                type="checkbox"
                                                checked={passwordVisible}
                                                onChange={togglePasswordVisibility}
                                                style={{ display: "none", marginRight: "5px" }}
                                            />
                                            <img src={showPassword} alt="show password" />
                                        </Label>
                                    </fieldset>
                                </div>
                                <P className="forgotPassword" onClick={() => setShowPasswordRecoveryForm(true)}>Forgot Password?</P>
                            </React.Fragment>
                        )}
                        <BaseButton type="submit">
                            {loading ?
                                <DotLoader
                                    size={20}
                                    color="white"
                                    className="dotLoader"
                                /> : (!showPasswordRecoveryForm) ? "Login" : "RESET PASSWORD"}
                        </BaseButton>
                    </form>
                    {error && <P style={{ color: 'red' }}>{error}</P>}
                </div>
            </div>
        </AuthWrapper>
    );
};
