import { BaseButton } from "../../components/buttons/styled";
import { AuthWrapper, AuthRow } from "./styled";
import authImg from "../../assets/authImg.svg";

export const Auth = () => {
    return (
        <AuthWrapper>
            <AuthRow tocolumn={"true"}>
                <div className="auth-img-div">
                    <img src={authImg} alt="auth-img" />
                </div>
                <div className="auth-form-div">
                    <form>
                        {/* login form hTML should begin below this line. */}
        



                        <BaseButton>LOG IN</BaseButton>
                    </form>
                </div>
            </AuthRow>
        </AuthWrapper>
    )
}