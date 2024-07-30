import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../components/buttons/styled";
import { AuthWrapper, AuthRow } from "./styled";
import authImg from "../../assets/authImg.svg";
import { BaseInputWrapper } from "../../components/formfields/input/styled";
import { A, H1, Label, P } from "../../components/typography/styled";
import Cookies from "universal-cookie";
import { authenticateUser } from "../../util/apis/authUser";
import { DotLoader } from "react-spinners";

export const Auth = () => {
    const cookies = new Cookies();
    const navigate = useNavigate();
    const [formDetails, setFormDetails] = useState({
        email: "",
        password: "",
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await authenticateUser(formDetails);
            if (response.status === "Success") {
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
                navigate("/dashboard");
            } else {
                setError('Authentication failed. Please check your credentials and try again.');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please check your credentials and try again.');
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
                    <P>Enter details to login.</P>
                    <form onSubmit={handleSubmit}>
                        <BaseInputWrapper
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={formDetails.email}
                            onChange={handleChange}
                        />
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
                        <A href="/" className="forgotPassword">FORGOT PASSWORD?</A>
                        <BaseButton type="submit">
                            {loading ?
                                <DotLoader
                                    size={20}
                                    color="white"
                                    className="dotLoader"
                                /> : "LOG IN"}
                        </BaseButton>
                    </form>
                    {error && <P style={{ color: 'red' }}>{error}</P>}
                </div>
            </AuthRow>
        </AuthWrapper>
    );
};
