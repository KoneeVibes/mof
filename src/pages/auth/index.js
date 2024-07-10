import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseButton } from "../../components/buttons/styled";
import { AuthWrapper, AuthRow } from "./styled";
import authImg from "../../assets/authImg.svg";
import { BaseInputWrapper } from "../../components/formfields/input/styled";

export const Auth = () => {
    const navigate = useNavigate();
    const [passwordVisible, setPasswordVisible] = useState(false);
    const authUser = (event) => {
        event.preventDefault();
        navigate("/dashboard");
    };

    const togglepasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    return (
        <AuthWrapper>
            <AuthRow tocolumn={"true"}>
                <div className="auth-img-div">
                    <img src={authImg} alt="auth-img" />
                </div>
                <div className="auth-form-div">
                    <h1>Welcome!</h1>
                    <p>Enter details to login.</p>
                    <form onSubmit={authUser}>
                        <BaseInputWrapper type="email" name="email" placeholder="Email" required />
                        < div style={{ position: "relative", width: "-webkit-fill-available" }}>
                            <BaseInputWrapper
                                type={passwordVisible ? "text" : "password"}
                                name="password" placeholder="Password"
                                required width={"-webkit-fill-available"}
                            />
                            <label className="showPassword">
                                <input
                                    type="checkbox"
                                    checked={passwordVisible}
                                    onChange={togglepasswordVisibility}
                                    style={{ display: "none", marginRight: "5px" }}
                                />
                                SHOW
                            </label>
                        </div>
                        <a href="/" className="forgotPassword">FORGOT PASSWORD?</a>
                        <BaseButton type="submit">LOG IN</BaseButton>
                    </form>
                </div>
            </AuthRow>
        </AuthWrapper>
    )
}