import { BaseButton } from "../../components/buttons/styled";
import { AuthWrapper, AuthRow } from "./styled";
import authImg from "../../assets/authImg.svg";
import { BaseInput } from "../../components/form/fields/input/style";

export const Auth = () => {
    return (
        <AuthWrapper>
            <AuthRow tocolumn={"true"}>
                <div className="auth-img-div">
                    <img src={authImg} alt="auth-img" />
                </div>
                <div className="auth-form-div">
                    <h1>Welcome!</h1>
                    <p>Enter details to login.</p>
                    <form>
                        {/* login form hTML should begin below this line.  */}
                        <BaseInput type="email" name="email" placeholder="Email" required width={"-webkit-fill-available"} />
                        <BaseInput type="password" name="password" placeholder="Password" required width={"-webkit-fill-available"} />
                        {/* <BaseInput type="checkbox" width={"-webkit-fill-available"} /> */}
                        {/* <label for="demoCheckbox"> Show</label> */}
                        <a href="/" class="forgot-password">Forgot Password?</a> 
                        <BaseButton>LOG IN</BaseButton>
                    </form>
                </div>
            </AuthRow>
        </AuthWrapper>
    )
}