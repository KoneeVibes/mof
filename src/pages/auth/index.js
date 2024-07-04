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
                    <form>
                        {/* login form hTML should begin below this line. */}
        
        



                        <BaseButton>LOG IN</BaseButton>
                    </form>
                </div>
            </Row>
        </AuthWrapper>
    )
}