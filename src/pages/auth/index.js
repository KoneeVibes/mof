import { BaseButton } from "../../components/button/styled";
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
                    <h1>Welcome!</h1>
                    <p>Enter details to login.</p>
                    <form>
                        {/* login form hTML should begin below this line.  */}
                        <input type="email" name="email" placeholder="Email" required /> <br/>
                        <input type="password" name="password" placeholder="Password" required />
                         <input type="checkbox"/>
                         <label for="demoCheckbox"> Show</label><br/>
                        <a href="/" class="forgot-password">Forgot Password?</a> <br/> 
                        <BaseButton>LOG IN</BaseButton>
                    </form>
                </div>
            </AuthRow>
        </AuthWrapper>
    )
}