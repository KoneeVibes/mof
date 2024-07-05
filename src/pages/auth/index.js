import { AuthImg } from "../../assets";
import { BaseButton } from "../../components/button/styled";
import { Row } from "../../components/flex";
import { AuthWrapper } from "./styled";

export const Auth = () => {
    return (
        <AuthWrapper>
            <Row tocolumn={"true"}>
                <div className="auth-img-div">
                    <AuthImg />
                </div>
                <div className="auth-form-div">
                    <h1>Welcome!</h1>
                    <p>Enter details to login.</p>
                    <form>
                        {/* login form hTML should begin below this line.  */}
                        <input type="email" name="email" placeholder="Email" required /> <br/>
                        <input type="password" name="password" placeholder="Password" required /> <br/>
                         <input type="checkbox"/>
                         <label for="demoCheckbox"> Check me!</label><br/>
                        <a href="/" class="forgot-password">Forgot Password?</a> <br/> 
                        <BaseButton>LOG IN</BaseButton>
                    </form>
                </div>
            </Row>
        </AuthWrapper>
    )
}